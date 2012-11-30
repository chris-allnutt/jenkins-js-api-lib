function JenkinsAPI (server_url, user, pass) {
  this.init(server_url, user, pass);
  return this;
};

JenkinsAPI.prototype.jobs_ = null;
JenkinsAPI.prototype.server_url_ = null;
JenkinsAPI.prototype.user_ = null;
JenkinsAPI.prototype.pass_ = null;

JenkinsAPI.prototype.init = function(server_url, user, pass) {
  this.server_url_ = server_url;
  this.user_ = user || null;
  this.pass_ = pass || null;
}

JenkinsAPI.prototype.getAPIUrl = function(url) {
  var url_to_convert = url || this.server_url_;
  return url_to_convert + '/api/json?jsonp=?';
}

JenkinsAPI.prototype.getJobs = function(callback) {
  var jobs = [];
  
  this.makeRequest(this.server_url_, function(response) {
      
    for(var x = 0; x < response.jobs.length; x++) {
      jobs.push(new JenkinsAPIJob(response.jobs[x]));
    }
    
    callback(jobs);
  });
}

JenkinsAPI.prototype.makeRequest = function(request_uri, callback) {
  var parameters = {
    success: callback || $.noop,
    url: this.getAPIUrl(request_uri)
  }
  
  if(this.user_ != null && this.pass_ != null) {
    parameters.username = this.user_;
    parameters.password = this.pass_
  }
  parameters.dataType = 'jsonp';
  $.ajax(parameters);
}