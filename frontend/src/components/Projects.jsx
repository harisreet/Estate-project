import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import {api} from "../api";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardstoshow, setcardtoshow] = useState(1);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    api.get("/projects/complete")
      .then(res => setProjectsData(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const updatecards = () => {
      if (window.innerWidth >= 1024) {
        setcardtoshow(projectsData.length > 0 ? projectsData.length : 1);
      } else {
        setcardtoshow(1);
      }
    };

    updatecards();
    window.addEventListener("resize", updatecards);

    return () => window.removeEventListener("resize", updatecards);
  }, [projectsData]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? projectsData.length - 1 : prev - 1
    );
  };

  if (projectsData.length === 0) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full" id="Projects">

      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Projects
        <span className="underline underline-offset-2 decoration-1 font-light pl-3">
          Completed
        </span>
      </h1>

      <p className="text-gray-500 max-w-80 text-center mb-8 mx-auto">
        Crafting Spaces, Building Legacies—Explore Our Portfolio
      </p>

      <div className="flex justify-end items-center mb-8">
        <button onClick={prevProject} className="p-3 bg-gray-300 rounded mr-2">
          <img src={assets.left_arrow} />
        </button>
        <button onClick={nextProject} className="p-3 bg-gray-300 rounded">
          <img src={assets.right_arrow} />
        </button>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-8 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex * 100) / cardstoshow}%)` }}
        >
          {projectsData.map((project, index) => (
            <div key={index} className="relative flex-shrink-0 w-full sm:w-1/3 md:w-1/3">
              <img
                src={`http://127.0.0.1:8000/uploads/${project.image_path}`}
                className="w-full h-auto mb-17"
              />

              <div className="absolute left-0 right-0 bottom-5 flex justify-center">
                <div className="inline-block bg-white  px-4 py-2 shadow-md">
                  <h2 className="font-semibold text-xl text-gray-800">{project.title}</h2>
                  <p className="text-gray-500 text-sm">
                    ${project.price} <span>|</span> {project.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Projects;
