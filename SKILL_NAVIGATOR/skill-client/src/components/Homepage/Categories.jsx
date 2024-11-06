import React from 'react';

const categories = [
    { name: 'Design & Development', icon: 'src/assets/explore1.png' },
    { name: 'Marketing & Communication', icon: 'src/assets/explore2.png' },
    { name: 'Digital Marketing', icon: 'src/assets/explore3.png' },
    { name: 'Programming Courses', icon: 'src/assets/explore4.png' },
    { name: 'Business & Consulting', icon: 'src/assets/explore5.png' },
    { name: 'Finance Management', icon: 'src/assets/explore6.png' },
];

const Categories = () => {
  return (
    <div className="py-8 bg-gray-50">
      <h2 className="text-center text-2xl font-bold mb-6">Explore courses by category</h2>
      <div className="grid grid-cols-3 gap-6 px-16">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`flex items-center bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:bg-blue-100`}
          >
            <img 
              src={category.icon} 
              alt={category.name} 
              className="w-16 h-16 mr-5" 
            />
            <div className={`flex flex-col ${['Design & Development', 'Finance Management', 'Business & Consulting', 'Programming Courses', 'Marketing & Communication', 'Digital Marketing'].includes(category.name) ? 'text-2xl font-semibold' : 'text-base'}`}>
              {category.name === 'Business & Consulting' ? (
                <div className="flex flex-row">
                  <div className="mr-1">Business</div>
                  <div>&</div>
                  <div className="ml-1">Consulting</div>
                </div>
              ) : category.name === 'Marketing & Communication' ? (
                <div className="flex flex-row">
                  <div className="mr-1">Marketing</div>
                  <div>&</div>
                  <div className="ml-1">Communication</div>
                </div>
              ) : category.name === 'Design & Development' ? (
                <div className="flex flex-row">
                  <div className="mr-1">Design</div>
                  <div>&</div>
                  <div className="ml-1">Development</div>
                </div>
              ) : (
                <div>{category.name}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
