jenkins-js-api-lib
==================

Jenkins JS Lib is a Javascript library for interacting with a Jenkins CI Server

Usage
-----
Initialization

    var jenkinsAPI = new JenkinsAPI.init(server_url, user, pass);
    // or
    var jenkinsAPI = new JenkinsAPI.init(server_url);

Usage

    jenkinsAPI.getAllJobs();
    jenkinsAPI.getJob(job_url);
    jenkinsAPI.generateDownstreamDependencyGraph(job_url);
    jenkinsAPI.build(job_url, build_paramaters);