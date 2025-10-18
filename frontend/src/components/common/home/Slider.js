import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Скидка 20% на все авторские кофе",
      description: "Только этой неделей попробуйте наши новые авторские напитки",
      image: "/images/slides/slide1.jpg",
      buttonText: "Посмотреть меню",
      link: "/menu"
    },
    {
      id: 2,
      title: "Книжный клуб каждую субботу",
      description: "Присоединяйтесь к нашему книжному клубу и обсуждайте интересные книги",
      image: "/images/slides/slide2.jpg", 
      buttonText: "Узнать больше",
      link: "/events"
    },
    {
      id: 3,
      title: "Новые веганские десерты",
      description: "Попробуйте нашу новую линейку веганских десертов",
      image: "/images/slides/slide3.jpg",
      buttonText: "Посмотреть",
      link: "/menu"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <a href={slide.link} className="btn btn-primary">
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
        
        <button className="slider-btn prev" onClick={prevSlide}>‹</button>
        <button className="slider-btn next" onClick={nextSlide}>›</button>
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;