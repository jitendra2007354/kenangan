#include <iostream>
#include <fstream>
#include <string>
#include <regex>
#include <vector>
#include <algorithm>
#include <cctype>

std::string getFileStem(const std::string& filepath) {
    std::string name = filepath;
    size_t slash_pos = name.find_last_of("\\/");
    if (slash_pos != std::string::npos) {
        name = name.substr(slash_pos + 1);
    }
    size_t dot_pos = name.find_last_of('.');
    if (dot_pos != std::string::npos) {
        name = name.substr(0, dot_pos);
    }
    return name;
}

std::string getParentPath(const std::string& filepath) {
    size_t slash_pos = filepath.find_last_of("\\/");
    if (slash_pos == std::string::npos) return "";
    return filepath.substr(0, slash_pos);
}

bool fileExists(const std::string& filepath) {
    std::ifstream file(filepath.c_str(), std::ios::in | std::ios::binary);
    return file.good();
}

std::string slugify(std::string text) {
    std::transform(text.begin(), text.end(), text.begin(),
        [](unsigned char c){ return std::tolower(c); });
    std::regex non_alnum("[^a-z0-9]+");
    std::string slug = std::regex_replace(text, non_alnum, "-");
    if (!slug.empty() && slug.front() == '-') slug.erase(0, 1);
    if (!slug.empty() && slug.back() == '-') slug.pop_back();
    return slug;
}

std::string readFile(const std::string& filepath) {
    std::ifstream file(filepath, std::ios::in | std::ios::binary);
    if (file) {
        std::string contents;
        file.seekg(0, std::ios::end);
        contents.resize(file.tellg());
        file.seekg(0, std::ios::beg);
        file.read(&contents[0], contents.size());
        return contents;
    }
    return "";
}

void writeFile(const std::string& filepath, const std::string& content) {
    std::ofstream file(filepath, std::ios::out | std::ios::binary);
    if (file) {
        file.write(content.c_str(), content.size());
    }
}

std::string replaceTitle(std::string prefix, const std::string& new_title) {
    std::regex title_tag("<title>(.*?)</title>");
    return std::regex_replace(prefix, title_tag, "<title>" + new_title + " | Kenangan</title>");
}

// Replaces broken links with index.html to fix AdSense navigation flags
std::string fixBrokenLinks(std::string html) {
    std::string search = "href=\"#\"";
    std::string replace = "href=\"index.html\"";
    size_t pos = 0;
    while ((pos = html.find(search, pos)) != std::string::npos) {
        html.replace(pos, search.length(), replace);
        pos += replace.length();
    }
    return html;
}

// Injects Cookie Consent Banner for AdSense / GDPR compliance
std::string injectCookieBanner(std::string html) {
    std::string banner = R"(
    <div id="cookie-banner" style="position: fixed; bottom: 0; left: 0; width: 100%; background: #111; color: #fff; padding: 15px 20px; text-align: center; z-index: 9999; display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap;">
        <span style="font-size: 0.9rem;">We use cookies to serve personalized ads via Google AdSense and analyze traffic. By continuing to use this site, you consent to our use of cookies.</span>
        <button onclick="document.getElementById('cookie-banner').style.display='none'" style="background: var(--accent-color); color: #fff; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold;">Accept & Close</button>
    </div>
</body>)";
    std::string search = "</body>";
    size_t pos = html.rfind(search);
    if (pos != std::string::npos) {
        html.replace(pos, search.length(), banner);
    }
    return html;
}

void processFile(const std::string& filepathStr) {
    std::cout << "Processing " << filepathStr << std::endl;
    std::string content = readFile(filepathStr);
    if (content.empty()) return;

    std::string post_feed_marker = "<div class=\"post-feed\">";
    size_t feed_pos = content.find(post_feed_marker);
    if (feed_pos == std::string::npos) {
        std::cout << "Skipping, no post-feed found." << std::endl;
        return;
    }
    
    size_t prefix_end = feed_pos + post_feed_marker.length();
    std::string prefix = content.substr(0, prefix_end);

    std::vector<std::string> articles;
    std::string article_start_marker = "<article class=\"post-content\">";
    std::string article_end_marker = "</article>";

    size_t search_pos = prefix_end;
    while (true) {
        size_t start_pos = content.find(article_start_marker, search_pos);
        if (start_pos == std::string::npos) break;
        
        size_t end_pos = content.find(article_end_marker, start_pos);
        if (end_pos == std::string::npos) break;
        
        end_pos += article_end_marker.length();
        articles.push_back(content.substr(start_pos, end_pos - start_pos));
        search_pos = end_pos;
    }

    if (articles.empty()) {
        std::cout << "No articles found." << std::endl;
        return;
    }

    std::string suffix = content.substr(search_pos);
    std::string new_feed_html = "";

    std::string category_name = getFileStem(filepathStr);

    std::regex title_regex("<h1 class=\"post-title\">(.*?)</h1>");
    std::regex img_regex("<img src=\"(.*?)\"");
    std::regex cat_regex("<span class=\"category\">(.*?)</span>");
    std::regex p_regex("<h2>.*?</h2>[\\s\\S]*?<p>(.*?)</p>");
    std::regex fallback_p_regex("<p>(.*?)</p>");
    std::regex html_tags("<[^>]+>");
    std::regex author_regex("<a href=\"about.html\">(.*?)</a>");
    std::regex date_regex("<span>📅 (.*?)</span>");

    for (size_t i = 0; i < articles.size(); ++i) {
        std::string article = articles[i];
        
        std::smatch t_match;
        std::string title = "Article " + std::to_string(i + 1);
        if (std::regex_search(article, t_match, title_regex)) {
            title = t_match[1].str();
        }
        title = std::regex_replace(title, std::regex("^\\d+\\.\\s*"), "");

        std::string slug = slugify(title);
        if (slug.empty()) slug = "article-" + std::to_string(i);

        std::string article_filename = category_name + "-" + slug + ".html";
        std::string parent_path = getParentPath(filepathStr);
        std::string article_filepath = parent_path.empty() ? article_filename : parent_path + "/" + article_filename;

        std::string article_prefix = replaceTitle(prefix, title);
        std::string full_article_content = article_prefix + "\n" + article + "\n" + suffix;
        
        full_article_content = fixBrokenLinks(full_article_content);
        full_article_content = injectCookieBanner(full_article_content);
        
        writeFile(article_filepath, full_article_content);

        std::smatch m;
        std::string img_src = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80";
        if (std::regex_search(article, m, img_regex)) img_src = m[1].str();

        std::string cat = category_name;
        cat[0] = std::toupper(cat[0]);
        if (std::regex_search(article, m, cat_regex)) cat = m[1].str();

        std::string excerpt = "Read this full article to learn more.";
        if (std::regex_search(article, m, p_regex)) {
            excerpt = m[1].str();
        } else if (std::regex_search(article, m, fallback_p_regex)) {
            excerpt = m[1].str();
        }
        excerpt = std::regex_replace(excerpt, html_tags, "");
        if (excerpt.length() > 150) {
            excerpt = excerpt.substr(0, 147) + "...";
        }

        std::string author = "Aria Kenangan";
        if (std::regex_search(article, m, author_regex)) author = m[1].str();

        std::string date = "June 2026";
        if (std::regex_search(article, m, date_regex)) date = m[1].str();

        std::string card_html = R"(
        <article class="post-card" style="border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 30px; overflow: hidden; display: flex; flex-direction: column; background: var(--off-white); transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 20px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="height: 250px; overflow: hidden;">
                <img src=")" + img_src + R"(" alt=")" + title + R"(" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
            </div>
            <div style="padding: 25px;">
                <span class="category" style="font-size: 0.85rem; margin-bottom: 15px; display: inline-block; color: var(--accent-color); font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">)" + cat + R"(</span>
                <h2 style="margin-top: 0; font-size: 1.8rem; line-height: 1.3;"><a href=")" + article_filename + R"(" style="text-decoration: none; color: var(--text-color);">)" + title + R"(</a></h2>
                <p style="color: #555; font-size: 1rem; margin-bottom: 20px; line-height: 1.6;">)" + excerpt + R"(</p>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: #777;">
                    <span>By <strong>)" + author + R"(</strong> | )" + date + R"(</span>
                    <a href=")" + article_filename + R"(" style="font-weight: 600; color: var(--accent-color); text-decoration: none; display: flex; align-items: center; gap: 5px;">Read More <span style="font-size: 1.2rem;">&rarr;</span></a>
                </div>
            </div>
        </article>
        )";
        new_feed_html += card_html;
    }

    std::string new_category_content = prefix + "\n" + new_feed_html + "\n" + suffix;
    new_category_content = fixBrokenLinks(new_category_content);
    new_category_content = injectCookieBanner(new_category_content);
    writeFile(filepathStr, new_category_content);
    std::cout << "Updated " << filepathStr << " with " << articles.size() << " article cards." << std::endl;
}

int main() {
    std::string base_dir = "c:\\Users\\jiten\\Downloads\\kenagan\\kenagan";
    std::vector<std::string> files_to_process = {
        "index.html", "stories.html", "culture.html", "journal.html", "politics.html"
    };

    for (const auto& filename : files_to_process) {
        std::string filepath = base_dir + "\\" + filename;
        if (fileExists(filepath)) {
            processFile(filepath);
        } else {
            std::cout << "File not found: " << filepath << std::endl;
        }
    }

    return 0;
}
