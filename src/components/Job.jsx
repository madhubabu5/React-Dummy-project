import React, { useState } from 'react';

const generateId = () => 'id' + Math.random().toString(16).slice(2);

const firstObj = {
  id: generateId(),
  child: [
    // {
    //   id: generateId(),
    // },
    // {
    //   id: generateId(),
    // },
  ],
};

export default function Job() {
  const [jobs, setJobs] = useState([firstObj]);

  const addJob = (index) => {
    const newJob = { ...firstObj, id: generateId() };
    const modifiedJobs = [
      ...jobs.slice(0, index + 1),
      newJob,
      ...jobs.slice(index + 1),
    ];
    console.log(jobs);
    console.log(modifiedJobs);
    setJobs(modifiedJobs);
  };

  const deleteJob = (jobid) => {
    const arr = jobs.filter(({ id }) => {
      return id !== jobid;
    });
    setJobs(arr);
  };

  const addChild = (index) => {
    const newChild = {
      id: generateId(),
      child: [],
    };
    const currJob = jobs[index];
    const childArray = currJob.child;
    console.log(newChild, ' new child');
    console.log(childArray, ' old child array ');
    const newChildArray = [...childArray, newChild];
    console.log(currJob, 'curr job');
    console.log(newChildArray, 'new child array');
    // setJobs(...jobs, (jobs[index].child = newArray));
    setJobs((jobs) => (jobs[index].child = newChildArray));
  };

  return (
    <JobsComponent
      jobs={jobs}
      addJob={addJob}
      deleteJob={deleteJob}
      addChild={addChild}
    />
  );
}

const JobsComponent = ({ jobs, addJob, deleteJob, addChild }) => {
  console.log(jobs, 'curr jobs');
  console.log(Array.isArray(jobs));
  return (
    <div>
      {jobs.map((job, idx) => (
        <JobComponent
          job={job}
          addJob={() => addJob(idx)}
          deleteJob={() => deleteJob(job.id)}
          addChild={() => addChild(idx)}
        />
      ))}
    </div>
  );
};

const JobComponent = ({ job, addJob, deleteJob, addChild }) => {
  console.log(job, 'jobbb');
  return (
    <div className={job.id}>
      <input type="text" value={job.id} />
      <button onClick={addJob}>+</button>
      <button onClick={deleteJob}>-</button>
      <button onClick={addChild}>add Child</button>
      {job.child?.length !== 0 &&
        job.child.map((idd) => {
          return <input type="text" value={idd.id} />;
        })}
    </div>
  );
};
