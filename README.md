jenkins-js-api-lib
==================

Jenkins JS Lib is a Javascript library for interacting with a Jenkins CI Server

Usage
-----

JenkinsAPI.init(server_url, user, pass);

JenkinsAPI.getAllJobs();
JenkinsAPI.getJob(job_url);
JenkinsAPI.getDownstreamDependencies(job_url);
JenkinsAPI.build(job_url, build_paramaters);
