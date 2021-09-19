import React from 'react';

const Skills: React.FC<any> = ({ skills }: { skills: string[] }) => {
  return (
    <section className="section skills">
      <h3 className="section__heading">Skills</h3>
      <div>
        <ul className="skills__list">
          {skills?.length > 0 &&
            skills.map((item) => (
              <li>
                <p>{item}</p>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
