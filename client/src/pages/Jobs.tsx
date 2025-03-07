import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { AiOutlineWarning } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
`;

const JobCard = styled(Card)`
  width: 280px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    border: 1px solid #1677ff;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const WarningIcon = styled(AiOutlineWarning)`
  color: #f1c40f;
  font-size: 20px;
  position: absolute;
  top: 12px;
  right: 12px;
`;

const BlueprintText = styled.span`
  color: #1677ff;
`;

const mockJobs = [
  {
    id: "1",
    title: "Software Engineer",
    department: "Engineering",
    location: "New York, NY",
    employmentType: "Full-time",
    salary: "$120,000",
    hiringManager: "John Doe",
    blueprint: "Dev Eng",
    blueprintLinked: true,
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    employmentType: "Full-time",
    salary: "$130,000",
    hiringManager: "Jane Smith",
    blueprint: "Product Manager",
    blueprintLinked: false,
  },
  {
    id: "3",
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    employmentType: "Contract",
    salary: "$90,000",
    hiringManager: "Alice Johnson",
    blueprint: "UX Designer",
    blueprintLinked: true,
  },
  {
    id: "4",
    title: "Data Scientist",
    department: "Data",
    location: "Boston, MA",
    employmentType: "Full-time",
    salary: "$110,000",
    hiringManager: "Bob Brown",
    blueprint: "Data Scientist",
    blueprintLinked: false,
  },
  {
    id: "5",
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Chicago, IL",
    employmentType: "Full-time",
    salary: "$70,000",
    hiringManager: "Carol White",
    blueprint: "Marketing Specialist",
    blueprintLinked: true,
  },
  {
    id: "6",
    title: "Sales Manager",
    department: "Sales",
    location: "Austin, TX",
    employmentType: "Full-time",
    salary: "$100,000",
    hiringManager: "David Green",
    blueprint: "RSM",
    blueprintLinked: true,
  },
  {
    id: "7",
    title: "Customer Support",
    department: "Support",
    location: "Remote",
    employmentType: "Part-time",
    salary: "$40,000",
    hiringManager: "Eve Black",
    blueprint: "Support Rep",
    blueprintLinked: true,
  },
  {
    id: "8",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Seattle, WA",
    employmentType: "Full-time",
    salary: "$115,000",
    hiringManager: "Frank Blue",
    blueprint: "DevOps",
    blueprintLinked: true,
  },
  {
    id: "9",
    title: "HR Manager",
    department: "HR",
    location: "Denver, CO",
    employmentType: "Full-time",
    salary: "$95,000",
    hiringManager: "Grace Yellow",
    blueprint: "HR Manager",
    blueprintLinked: false,
  },
  {
    id: "10",
    title: "Finance Analyst",
    department: "Finance",
    location: "New York, NY",
    employmentType: "Full-time",
    salary: "$105,000",
    hiringManager: "Hank Purple",
    blueprint: "Finance Analyst",
    blueprintLinked: true,
  },
  {
    id: "11",
    title: "Content Writer",
    department: "Content",
    location: "Remote",
    employmentType: "Contract",
    salary: "$50,000",
    hiringManager: "Ivy Orange",
    blueprint: "Content Writer",
    blueprintLinked: true,
  },
  {
    id: "12",
    title: "Graphic Designer",
    department: "Design",
    location: "Los Angeles, CA",
    employmentType: "Full-time",
    salary: "$85,000",
    hiringManager: "Jack Pink",
    blueprint: "Graphic Designer",
    blueprintLinked: true,
  },
];

const Jobs = () => {
  const [jobs] = useState(mockJobs);
  const navigate = useNavigate();

  const handleCardClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <JobGrid>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          title={job.title}
          bordered={false}
          onClick={() => handleCardClick(job.id)}
        >
          <p>
            <strong>Hiring Manager:</strong> {job.hiringManager}
          </p>
          <p>
            <strong>Department:</strong> {job.department}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Salary:</strong> {job.salary}
          </p>
          {!job.blueprintLinked && (
            <Tooltip title="This job needs to be linked to a blueprint">
              <WarningIcon />
            </Tooltip>
          )}
          {job.blueprintLinked && (
            <p>
              <strong style={{ color: "#1677ff" }}>Blueprint:</strong>{" "}
              {job.blueprint && <BlueprintText>{job.blueprint}</BlueprintText>}
            </p>
          )}
        </JobCard>
      ))}
    </JobGrid>
  );
};

export default Jobs;
