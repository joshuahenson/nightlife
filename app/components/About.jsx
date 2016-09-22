import React from 'react';

const About = () => {
  return (
    <div>
      <h5>
        A sample project built by <a href="https://github.com/joshuahenson">Joshua Henson</a> for improving development skills using universal React while implementing the following user stories.
      </h5>
      <ul className="list-unstyled">
        <li>User Story: As an unauthenticated user, I can view all bars in my area.</li>
        <li>User Story: As an authenticated user, I can add myself to a bar to indicate I am going there tonight.</li>
        <li>User Story: As an authenticated user, I can remove myself from a bar if I no longer want to go there.</li>
        <li>User Story: As an unauthenticated user, when I login I should not have to search again.</li>
      </ul>

    </div>
  );
};

export default About;
