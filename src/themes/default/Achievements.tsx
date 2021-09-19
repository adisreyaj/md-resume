import React from 'react';
import { Achievements } from '../../interfaces/resume-data.interface';

const Achievements: React.FC<any> = ({
  achievements,
}: {
  achievements: Achievements[];
}) => {
  return (
    <section
      className="mt-10 section achievements"
      style={{ pageBreakBefore: 'always' }}
    >
      <h3 className="section__heading">Achievements</h3>
      <ul className="achievements__list">
        {achievements.map((item) => (
          <li>
            <header>
              <h4>{item.title}</h4>
            </header>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: item.data.join('') }}
            ></div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Achievements;