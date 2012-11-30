jenkins-js-api-lib
==================

Jenkins JS Lib is a Javascript library for interacting with a Jenkins CI Server

Depends on Jquery, examples use 1.8.3

Usage
-----
Initialization

    var jenkinsAPI = new JenkinsAPI(server_url, user, pass); // http auth user
    // or
    var jenkinsAPI = new JenkinsAPI(server_url); // no auth

Usage

    jenkinsAPI.getJobs(job_url);