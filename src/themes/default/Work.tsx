import React from 'react';
import { Work } from '../../interfaces/resume-data.interface';

const Work: React.FC<any> = ({ work }: { work: Work[] }) => {
  return (
    <section className="section experience">
      <h3 className="section__heading">Experience</h3>
      <ul className="experience__list">
        {work.map((item) => {
          return (
            <li className="p-2">
              <header className="text-sm text-gray-600">
                <div>
                  <h4 className="mb-1">{item.company}</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-semibold">{item.role}</p>
                  <p>/</p>
                  <p>
                    {item.startYear} - {item.present ? 'Present' : item.endYear}
                  </p>
                </div>
                <div>
                  <p>{item.location}</p>
                </div>
              </header>
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{
                  __html: item.data.join(''),
                }}
              ></div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Work;
