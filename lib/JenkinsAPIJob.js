function JenkinsAPIJob (job_object) {
  this.color = job_object.color;
  this.name =  job_object.name;
  this.url =   job_object.url;
};

JenkinsAPIJob.prototype.color = null;
JenkinsAPIJob.prototype.name = null;
JenkinsAPIJob.prototype.url = null;