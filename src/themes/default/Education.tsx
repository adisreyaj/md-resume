import React from 'react';
import { Education } from '../../interfaces/resume-data.interface';

const Education: React.FC<{ education: Education[] }> = ({ education }) => {
  return (
    <section className="section education">
      <h3 className="section__heading">Education</h3>
      <ul className="education__list">
        {education?.length > 0 &&
          education.map((item) => (
            <li key={item.name}>
              <header>
                <h4>{item.name}</h4>
              </header>
              <div className="flex items-center space-x-2 text-sm">
                <p>{item.field}</p>
                <p>/</p>
                <p>
                  {item.startYear} - {item.endYear}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Education;
