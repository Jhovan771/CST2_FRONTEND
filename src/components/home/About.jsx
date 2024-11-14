import React from "react";
import { MdStarBorderPurple500 } from "react-icons/md";

const About = () => {
  return (
    <div id='About' className='pt-16 m-10'>
      <div className='w-auto border-double border-4 border-black bg-gray-100'>
        <div className='flex justify-center items-center font-serif text-[24px] underline'>
          <MdStarBorderPurple500 className='mr-4' />
          <h1>A B O U T</h1>
          <MdStarBorderPurple500 className='ml-4' />
        </div>
        <div className='p-4 text-wrap text-justify font-serif indent-8 tracking-widest leading-loose'>
          <p className=''>
            Our system is designed to help students develop and improve their
            pronunciation skills in a focused and engaging way. With a variety
            of interactive exercises, personalized feedback, and real-time
            practice opportunities, the system provides a supportive environment
            for learners to work on their speaking abilities. Whether they are
            beginners or more advanced learners, students can practice correct
            pronunciation gaining confidence in their spoken language skills. By
            emphasizing accurate pronunciation, our system aims to bridge the
            gap between written and spoken language, ensuring that students are
            not only able to read and write proficiently but can also
            communicate clearly and effectively in real-world situations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
