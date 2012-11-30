describe("Jenkins API", function() {

  var api;
  var baseTestUrl = 'http://testmeout.com';

  beforeEach(function() {
    api = new JenkinsAPI(baseTestUrl);
  });

  afterEach(function() {

  });

  it("getAPIUrl should return root API url for json", function() {
    expect(api.getAPIUrl()).toEqual(baseTestUrl + '/api/json?jsonp=?');
  });

  it("getAPIUrl should return API url for json when provided with a non root url", function() {
    var project_url = 'http://testmeout.com/Our_Build_Project';

    expect(api.getAPIUrl(project_url)).toEqual(project_url + '/api/json?jsonp=?');
  });
  
  it("uses $.noop when no callback is provided", function() {
    spyOn($, 'ajax').andReturn(true);
  
    api.makeRequest(baseTestUrl, $.noop);
    
    expect($.ajax).toHaveBeenCalledWith({
      success: $.noop,
      url: api.getAPIUrl(),
      dataType: 'jsonp'
    });    
  });
  
  it("makes authed request when user credentials are provided", function() {
    var user, pass;
    user = 'chris';
    pass = 'is-awesome';
    
    spyOn($, 'ajax').andReturn(true);
    
    api.init(baseTestUrl, user, pass);
    api.makeRequest(baseTestUrl, $.noop);
    
    expect($.ajax).toHaveBeenCalledWith({
      success: $.noop,
      url: api.getAPIUrl(),
      username: user,
      password: pass,
      dataType: 'jsonp'
    });
  });
  
  it("returns a list of jobs when requesting all jobs", function() {
    var request, jobs_response, onSuccess;
    
    onSuccess = jasmine.createSpy('onSuccess');
    
    jobs_response = {
      "jobs": [
          {
            "name" : "Full_Function",
            "url" : "https://test.me/job/Full_Functin/",
            "color" : "red"
          },
          {
            "name" : "Account_Smoketest",
            "url" : "https://test.me/job/Account_SmokeTest/",
            "color" : "blue"
          }
      ]
    };
  
    spyOn($, 'ajax').andCallFake(function (params) {
      params.success(jobs_response);
    });

    api.init(baseTestUrl);
    api.getJobs(onSuccess);

    expect(onSuccess).toHaveBeenCalled();
    expect(onSuccess.mostRecentCall.args[0].length).toEqual(2);      

  });
  
  it("gets upsteam dependencies for job", function() {
    var request, jobs_response, job, onSuccess;
    
    job = new JenkinsAPIJob({
      color: 'green',
      url: 'http://123.me/job_uri',
      name: 'Hello World'
    });
    
    onSuccess = jasmine.createSpy('onSuccess');
    
    jobs_response = {
      "upstreamProjects": [
          {
            "name" : "Full_Function",
            "url" : "https://test.me/job/Full_Functin/",
            "color" : "red"
          },
          {
            "name" : "Account_Smoketest",
            "url" : "https://test.me/job/Account_SmokeTest/",
            "color" : "blue"
          }
      ]
    };
  
    spyOn($, 'ajax').andCallFake(function (params) {
      params.success(jobs_response);
    });

    api.init(baseTestUrl);
    api.getUpstreamDependenciesForJob(job, onSuccess);

    expect(onSuccess).toHaveBeenCalled();
    expect(onSuccess.mostRecentCall.args[0].length).toEqual(2);      

  });
});
