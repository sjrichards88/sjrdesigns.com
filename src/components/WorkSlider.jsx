import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const workItems = [
  {
    title: 'Frameless',
    image: '/src/assets/images/frameless.jpg',
    url: 'https://frameless.com/',
    note: 'developed at Dewynters'
  },
  {
    title: 'Hyde Park Winter Wonderland',
    image: '/src/assets/images/winter-wonderland.jpg',
    url: 'https://hydeparkwinterwonderland.com/',
    note: 'developed at Dewynters'
  },
  {
    title: 'Taste Festival',
    image: '/src/assets/images/taste.jpg',
    url: 'https://london.tastefestivals.com/',
    note: 'developed at Dewynters'
  },
  {
    title: 'Walk With Amal',
    image: '/src/assets/images/thewalk.jpg',
    url: 'https://walkwithamal.org/',
    note: 'developed at Dewynters'
  },
  {
    title: 'Mubadala World Tennis Championship',
    image: '/src/assets/images/mubadala.jpg',
    url: 'https://www.mubadalawtc.com/',
    note: 'developed at Dewynters'
  },
  {
    title: 'The Worlds Strongest Man',
    image: '/src/assets/images/wsm.jpg',
    url: 'https://www.theworldsstrongestman.com/',
    note: 'developed at Dewynters'
  },
  {
    title: 'ATP Champions Tour',
    image: '/src/assets/images/atp.jpg',
    url: 'https://www.atpchampionstour.com/',
    note: 'developed at Dewynters'
  },
  {
    title: 'Women\'s Scottish Open',
    image: '/src/assets/images/womensscottish.jpg',
    url: 'https://www.womensscottish.com/',
    note: 'developed at Dewynters'
  },
  {
    title: 'The Chevron Championship',
    image: '/src/assets/images/chevron.jpg',
    url: 'https://www.thechevronchampionship.com/',
    note: 'developed at Dewynters'
  },
  {
    title: 'PNC Championship',
    image: '/src/assets/images/pnc.jpg',
    url: 'https://www.pncchampionship.com/',
    note: 'developed at Dewynters'
  },
  {
    title: 'Bowwow London',
    image: '/src/assets/images/bowwowlondon.jpg',
    url: 'https://www.bowwowlondon.org/',
    note: 'developed at Dewynters'
  },
  {
    title: 'Just Dance Live',
    image: '/src/assets/images/just-dance-live.jpg',
    url: 'https://justdancelive.com/',
    note: 'developed at Dewynters'
  },
  {
    title: 'Sheikh Jaber Al-Ahmad Cultural Centre',
    image: '/src/assets/images/jacc.jpg',
    url: 'https://jacc-kw.com/',
    note: 'developed at Dewynters'
  },
  {
    title: 'Bouquets & Bows',
    image: '/src/assets/images/bows.jpg',
    url: 'https://bouquetsandbows.com',
    note: 'Personal Project'
  }
];

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const WorkCard = ({ item }) => (
  <div className="px-4 py-2">
    <a 
      href={item.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block w-full h-64 relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
    >
      <img 
        src={item.image} 
        alt={`${item.title} website`} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-white font-heading font-bold text-lg mb-1 drop-shadow-lg">{item.title}</h3>
        <p className="text-gray-300 text-sm drop-shadow">{item.note}</p>
      </div>
      <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-4 h-4 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </div>
    </a>
  </div>
);

export default function WorkSlider() {
  const [direction, setDirection] = useState('ltr');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    let requestId = null;
    let lastTime = Date.now();

    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const timeDelta = currentTime - lastTime;
      const scrollDelta = currentScrollY - lastScrollY;
      
      if (timeDelta > 0) {
        const velocity = Math.abs(scrollDelta) / timeDelta;
        setScrollVelocity(velocity);
        
        // Only change direction if there's significant scroll movement
        if (Math.abs(scrollDelta) > 30 && velocity > 0.1) {
          const newDirection = scrollDelta > 0 ? 'ltr' : 'rtl';
          setDirection(newDirection);
        }
        
        setLastScrollY(currentScrollY);
        lastTime = currentTime;
      }
    };

    const debouncedScroll = debounce(handleScroll, 150);
    
    const onScroll = () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      requestId = requestAnimationFrame(debouncedScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, [lastScrollY]);

  const baseSettings = {
    dots: false,
    infinite: true,
    speed: 8000, // Much slower speed
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: false, // Keep moving on hover to prevent jerkiness
    draggable: false, // Disable dragging to prevent conflicts
    swipe: false, // Disable swipe to prevent conflicts
    touchMove: false, // Disable touch to prevent conflicts
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const settings1 = {
    ...baseSettings,
    rtl: direction === 'rtl',
  };

  const settings2 = {
    ...baseSettings,
    rtl: direction === 'ltr', // Opposite direction
  };

  return (
    <div className="w-full space-y-8 overflow-visible">
      {/* First Row */}
      <div className="work-slider-container">
        <Slider {...settings1}>
          {workItems.map((item, index) => (
            <WorkCard key={`row1-${index}`} item={item} />
          ))}
        </Slider>
      </div>
      
      {/* Second Row */}
      <div className="work-slider-container">
        <Slider {...settings2}>
          {workItems.slice().reverse().map((item, index) => (
            <WorkCard key={`row2-${index}`} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
} 