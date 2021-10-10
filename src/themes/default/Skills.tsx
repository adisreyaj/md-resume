import React from 'react';
import { Skill } from '../../interfaces/resume-data.interface';

const Skills: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  return (
    <section className="section skills">
      <h3 className="section__heading">Skills</h3>
      <div>
        <ul className="skills__list">
          {skills?.length > 0 &&
            skills.map((item) => (
              <li key={item.skill}>
                <p>
                  {item.skill}
                  {item.proficiency && <span className="text-sm"> ({item.proficiency})</span>}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
