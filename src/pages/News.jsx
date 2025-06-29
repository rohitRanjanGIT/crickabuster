import React, { useState, useEffect } from 'react'
import { getFeaturedNews, getRegularNews, getAllNews } from '../data/newsData'

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  const featuredNews = getFeaturedNews();
  const regularNews = getRegularNews();
  const allNews = getAllNews();
  
  // For first page: show featured carousel + 3 sidebar + 6 bottom cards
  // For subsequent pages: show 12 news in grid
  const itemsPerPage = currentPage === 1 ? 9 : 12; // 3 sidebar + 6 bottom = 9 for page 1
  
  // Calculate pagination
  const totalFirstPageItems = 9; // 3 sidebar + 6 bottom
  const remainingItems = regularNews.length - totalFirstPageItems;
  const additionalPages = Math.ceil(remainingItems / 12);
  const totalPages = 1 + additionalPages;
  
  // Get current news items
  let currentNews, sidebarNews, bottomNews;
  
  if (currentPage === 1) {
    sidebarNews = regularNews.slice(0, 3);
    bottomNews = regularNews.slice(3, 9);
  } else {
    const startIndex = 9 + (currentPage - 2) * 12;
    currentNews = regularNews.slice(startIndex, startIndex + 12);
  }

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % featuredNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredNews.length]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextSlide = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % featuredNews.length);
  };

  const prevSlide = () => {
    setCurrentCarouselIndex((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
  };

  const currentFeatured = featuredNews[currentCarouselIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-left">
            <h1 className="text-5xl font-bold text-gray-900">Latest News</h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {currentPage === 1 ? (
            <div className="space-y-8">
              {/* Top Section: Featured Carousel + Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Featured News Carousel - Takes 3/4 of width */}
                <div className="lg:col-span-3">
                  <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden h-[680px]">
                    <div className="relative h-full">
                      <img 
                        src={currentFeatured.image} 
                        alt={currentFeatured.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      
                      {/* Carousel Controls */}
                      <button 
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button 
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="mb-4">
                          <span className={`${currentFeatured.categoryColor} text-white text-sm font-bold px-4 py-2 rounded-full`}>
                            {currentFeatured.category}
                          </span>
                        </div>
                        <div className="flex items-center text-sm mb-4 opacity-90">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span>{currentFeatured.date}</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 leading-tight">
                          {currentFeatured.title}
                        </h2>
                        <p className="text-lg opacity-90 mb-6 leading-relaxed max-w-3xl">
                          {currentFeatured.excerpt}
                        </p>
                        <a 
                          href={currentFeatured.link}
                          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                          Read Full Story
                          <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>

                      {/* Carousel Indicators */}
                      <div className="absolute top-6 right-6 flex space-x-2">
                        {featuredNews.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentCarouselIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentCarouselIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar News - Takes 1/4 of width */}
                <div className="lg:col-span-1">
                  <div className="space-y-4">
                    {sidebarNews.map((news) => (
                      <article key={news.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="relative h-24">
                          <img 
                            src={news.image} 
                            alt={news.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <span className={`${news.categoryColor} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                              {news.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex items-center text-gray-500 text-xs mb-2">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span>{news.date}</span>
                          </div>
                          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2">
                            {news.title}
                          </h3>
                          <a 
                            href={news.link} 
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Read More →
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Section: 2 rows of 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bottomNews.map((news) => (
                  <article key={news.id} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`${news.categoryColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                          {news.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{news.date}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {news.excerpt}
                      </p>
                      
                      <a 
                        href={news.link} 
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Read Story
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            // Subsequent pages layout - 3-4 columns grid
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentNews.map((news) => (
                <article key={news.id} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`${news.categoryColor} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                        {news.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{news.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {news.excerpt}
                    </p>
                    
                    <a 
                      href={news.link} 
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Read Story
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-16 space-x-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
                }`}
              >
                &lt;&lt;
              </button>
              
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
                }`}
              >
                &lt;
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
                }`}
              >
                &gt;
              </button>
              
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
                }`}
              >
                &gt;&gt;
              </button>
            </div>
          )}

          {/* Results Info */}
          <div className="text-center mt-8 text-gray-600">
            {currentPage === 1 ? (
              <>Showing 1-{Math.min(9, regularNews.length)} of {regularNews.length} news articles (+ {featuredNews.length} featured)</>
            ) : (
              <>Showing {9 + (currentPage - 2) * 12 + 1}-{Math.min(9 + (currentPage - 1) * 12, regularNews.length)} of {regularNews.length} news articles</>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
