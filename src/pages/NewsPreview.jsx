import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getAllNews } from '../data/newsData';

export default function NewsPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const allNews = getAllNews();
  const article = allNews.find(news => news.id === parseInt(id));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center text-xs p-4">
        <div className="bg-gray-100 p-6 rounded shadow">
          <h1 className="text-lg font-semibold mb-2">Article Not Found</h1>
          <p className="text-gray-500 mb-4">The article you're looking for doesn't exist.</p>
          <Link to="/news" className="text-blue-600 underline text-sm">← Back to News</Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  // Get more related news - first try same category, then fill with others
  const sameCategory = allNews
    .filter(n => n.id !== article.id && n.category === article.category)
    .slice(0, 3);
  
  const otherNews = allNews
    .filter(n => n.id !== article.id && n.category !== article.category)
    .slice(0, 6 - sameCategory.length);
    
  const related = [...sameCategory, ...otherNews];
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 text-gray-800 text-xs leading-snug py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Navigation */}
        <div className="mb-4">
          <Link to="/news" className="text-blue-600 hover:text-blue-800 inline-flex items-center text-[11px] font-medium">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to News
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Article Content Column */}
          <div className="flex-1">
            {/* Main Article Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {/* Metadata Bar */}
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`${article.categoryColor || 'bg-red-600'} text-white px-2 py-0.5 rounded mr-2 text-[10px] font-medium`}>
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-[10px]">{formatDate(article.date)}</span>
                  {article.updatedDate && (
                    <span className="text-gray-400 text-[10px]">(Updated: {formatDate(article.updatedDate)})</span>
                  )}
                </div>
                
                {/* Share Icons */}
                <div className="flex gap-2 items-center">
                  <button 
                    className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition flex items-center justify-center"
                    onClick={handleCopyLink}
                    title={copied ? "Copied!" : "Copy link"}
                  >
                    <svg className={`w-3 h-3 ${copied ? "text-green-600" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
                      {copied ? (
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      ) : (
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                      )}
                    </svg>
                  </button>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="p-1 bg-gray-100 rounded hover:bg-blue-100 transition">
                    <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="p-1 bg-gray-100 rounded hover:bg-blue-100 transition">
                    <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="p-4">
                {/* Article Header */}
                <h1 className="text-lg md:text-xl font-bold mt-2 mb-4 leading-tight">{article.title}</h1>

                {/* Featured Image */}
                <div className="w-full aspect-video bg-gray-100 overflow-hidden rounded-lg mb-4 shadow-sm">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {article.imageCaption && (
                  <p className="text-gray-500 text-[10px] italic mb-4">{article.imageCaption}</p>
                )}

                {/* Excerpt */}
                <div className="bg-blue-50 border-l-4 border-blue-600 px-3 py-2.5 rounded-r mb-6">
                  <p className="text-[12px] font-medium text-gray-700 italic">{article.excerpt}</p>
                </div>

                {/* Article Content */}
                <div className="prose prose-sm max-w-none mb-6 border-b pb-6">
                  {(article.content || '').split('\n\n').map((para, idx) => (
                    <p key={idx} className="mb-4 text-[13px] text-gray-700 leading-relaxed">
                      {para || <br />}
                    </p>
                  ))}
                </div>

                {/* Author Info */}
                {article.author && (
                  <div className="flex items-center gap-3 mb-6 pt-4 border-t border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden shadow-sm">
                      <img 
                        src={article.authorAvatar || 'https://via.placeholder.com/36'} 
                        alt={article.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-gray-900">{article.author}</p>
                      <p className="text-[10px] text-gray-500">{article.authorRole || 'Cricket Correspondent'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Back to Top - Mobile */}
            <div className="mt-6 text-center lg:hidden">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-blue-600 hover:text-blue-800 text-[11px] font-medium inline-flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Top
              </button>
            </div>
          </div>

          {/* More News Column - Only shows on larger screens */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 bg-blue-600 text-white">
                  <h2 className="text-sm font-bold flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    MORE CRICKET NEWS
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {related.map((r, i) => (
                    <Link 
                      key={r.id} 
                      to={`/news/${r.id}`} 
                      className={`block hover:bg-blue-50 transition p-3 ${i === related.length - 1 ? '' : 'border-b border-gray-100'}`}
                    >
                      <div className="flex gap-3">
                        <div className="w-20 h-16 flex-shrink-0 bg-gray-100 overflow-hidden rounded shadow-sm">
                          <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`${r.categoryColor || 'bg-gray-600'} text-white text-[9px] px-1.5 py-0.5 rounded inline-block mb-1`}>
                            {r.category}
                          </span>
                          <h3 className="text-[12px] font-semibold leading-tight line-clamp-2 mb-1">{r.title}</h3>
                          <div className="text-[10px] text-gray-500">{formatDate(r.date)}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile More News (hidden on larger screens) */}
        <div className="mt-8 pt-2 lg:hidden">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-blue-600 text-white">
              <h2 className="text-sm font-bold flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                MORE CRICKET NEWS
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {related.slice(0, 4).map((r, i) => (
                <Link 
                  key={r.id} 
                  to={`/news/${r.id}`} 
                  className={`block hover:bg-blue-50 transition p-3 ${i === related.slice(0, 4).length - 1 ? '' : 'border-b border-gray-100'}`}
                >
                  <div className="flex gap-3">
                    <div className="w-20 h-16 flex-shrink-0 bg-gray-100 overflow-hidden rounded shadow-sm">
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`${r.categoryColor || 'bg-gray-600'} text-white text-[9px] px-1.5 py-0.5 rounded inline-block mb-1`}>
                        {r.category}
                      </span>
                      <h3 className="text-[12px] font-semibold leading-tight line-clamp-2 mb-1">{r.title}</h3>
                      <div className="text-[10px] text-gray-500">{formatDate(r.date)}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Top - Desktop (hidden on mobile) */}
        <div className="mt-8 text-center hidden lg:block">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-blue-600 hover:text-blue-800 text-[11px] font-medium inline-flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100"
          >
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
}