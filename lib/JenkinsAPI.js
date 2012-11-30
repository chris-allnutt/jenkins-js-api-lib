function JenkinsAPI (server_url, user, pass) {
  this.init(server_url, user, pass);
  return this;
};

JenkinsAPI.prototype.jobs_ = null;
JenkinsAPI.prototype.server_url_ = null;
JenkinsAPI.prototype.user_ = null;
JenkinsAPI.prototype.pass_ = null;

JenkinsAPI.prototype.init = function (server_url, user, pass) {
  this.server_url_ = server_url;
  this.user_ = user || null;
  this.pass_ = pass || null;
}

JenkinsAPI.prototype.getAPIUrl = function (url) {
  var url_to_convert = url || this.server_url_;
  return url_to_convert + '/api/json?jsonp=?';
}

JenkinsAPI.prototype.getJobs = function (callback) {
  var jobs = [];
  
  this.makeRequest(this.server_url_, function (response) {
      
    for(var x = 0; x < response.jobs.length; x++) {
      jobs.push(new JenkinsAPIJob(response.jobs[x]));
    }
    
    callback(jobs);
  });
}

// JenkinsAPI.prototype.buildJob = function (job, callback, parameters) {
//   this.makeRequest(job.url + '/build', callback, parameters);
// }

JenkinsAPI.prototype.makeRequest = function (request_uri, callback, parameters) {
  var options = {
    success: callback || $.noop,
    url: this.getAPIUrl(request_uri),
    dataType: 'jsonp'
  }
  
  if(this.user_ != null && this.pass_ != null) {
    options.username = this.user_;
    options.password = this.pass_
  }
  
  if(parameters != null) {
    options.data = JSON.stringify(parameters);
  }
  
  $.ajax(options);
}