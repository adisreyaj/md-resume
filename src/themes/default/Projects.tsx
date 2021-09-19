import React from 'react';
import { Project } from '../../interfaces/resume-data.interface';

const Projects: React.FC<any> = ({ projects }: { projects: Project[] }) => {
  return (
    <section>
      <h3 className="section__heading">Projects</h3>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 print:grid-cols-2">
        {projects.map((project) => (
          <li className="p-4 rounded-md print:p-0">
            <header>
              <a
                href={project.links[0].link}
                rel="noreferrer noopener"
                target="_blank"
                className="text-lg font-bold text-gray-800"
              >
                {project.name}
              </a>
            </header>
            <div
              className="mt-1"
              dangerouslySetInnerHTML={{ __html: project.data.join('') }}
            ></div>
            <footer className="mt-2">
              <ul className="flex flex-wrap items-center -mx-1">
                {project.technologies.map((item) => (
                  <li className="px-2 py-1 m-1 text-sm bg-gray-200 rounded-md">
                    {item}
                  </li>
                ))}
              </ul>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
