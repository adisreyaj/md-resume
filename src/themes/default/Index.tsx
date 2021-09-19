import React from 'react';
import { ResumeData } from '../../interfaces/resume-data.interface';
import Achievements from './Achievements';
import Contact from './Contact';
import Education from './Education';
import Header from './Header';
import Languages from './Languages';
import Projects from './Projects';
import Skills from './Skills';
import Socials from './Socials';
import Work from './Work';
export const Main: React.FC<{ data: ResumeData | null }> = ({ data }) => {
  if (!data) {
    throw new Error('Data not provided');
  }
  const {
    metadata,
    education,
    work,
    skills,
    languages,
    projects,
    achievements,
    socials,
  } = data;
  return (
    <section className="max-w-5xl p-4 pt-24 mx-auto print:max-w-a4 print:p-10">
      <Header metadata={metadata} />
      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 md:gap-6 print:gap-10">
        <div>
          <Work work={work} />
          <Education education={education} />
          <Achievements achievements={achievements} />
        </div>
        <div>
          <Skills skills={skills} />
          <Languages languages={languages} />
          <Contact metadata={metadata} />
          <Socials socials={socials} />
        </div>
      </div>
      <div className="p-6 bg-gray-100 print:p-0 print:bg-white">
        <Projects projects={projects} />
      </div>
    </section>
  );
};
