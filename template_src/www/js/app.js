//code folding level 3

var mzi;
var app_version = "1.0.0";
var app_name = "Mzi";
var app = {
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {

        if (cordova.platformId == 'android') {
            StatusBar.backgroundColorByHexString("#333");
        }

        cordova.getAppVersion.getVersionNumber().then(function (v) {
            app_version = v;
        });

        cordova.getAppVersion.getAppName().then(function (n) {
            app_name = n;

            console.log(n+" v"+app_version);
        });

        

        //easy loading scripts with jquery $.loadScript()
        jQuery.loadScript = function (url, callback, error) {
            jQuery.ajax({
                url: url,
                dataType: 'script',
                success: callback,
                error: error,
                async: true
            });
        };

        //for setting a datetime-local input to now!
        $.fn.setNow = function (onlyBlank) {
            var now = new Date($.now())
            , year
            , month
            , date
            , hours
            , minutes
            , seconds
            , formattedDateTime
            ;

            year = now.getFullYear();
            month = now.getMonth().toString().length === 1 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1;
            date = now.getDate().toString().length === 1 ? '0' + (now.getDate()).toString() : now.getDate();
            hours = now.getHours().toString().length === 1 ? '0' + now.getHours().toString() : now.getHours();
            minutes = now.getMinutes().toString().length === 1 ? '0' + now.getMinutes().toString() : now.getMinutes();
            seconds = now.getSeconds().toString().length === 1 ? '0' + now.getSeconds().toString() : now.getSeconds();

            formattedDateTime = year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds;

            if ( onlyBlank === true && $(this).val() ) {
            return this;
            }

            $(this).val(formattedDateTime);

            return this;
        };

        //for message passing between components
        window.Event = new Vue();

        function log(text){

            console.log(text);
        }

        function obj(name){

            return JSON.parse(name);
        }
        function str(name){

            return JSON.stringify(name);
        }
        //set the url for the web-api
        function url() {

            return 'https://yoursite.com/';
        }
        function api(endpoint){

            return url() + 'web-api/' + endpoint;
        }
        function info(message){
            log("Info:" + message);
            $.notify(message,'info');
        }
        function error(message){
            log("Error: " + message);
            $.notify(message,'error');
        }
        function notify(message){
            log("Notification:" + message);
            $.notify(message,'success');
        }
        function showView(name){

            Event.$emit('showView',name);
        }
        function exists(key){
            if (localStorage.getItem(key) === null) {
                return false;
            }
            return true;
        }
        function fetch(key){
            if(exists(key))
                return obj(localStorage.key);
            return null;
        }
        function access_token(){
            if(exists('token'))
            {
                var token = obj(localStorage.getItem('token'));
                return token.access_token;
            }
            return '';
        }
        function validate(category,value){
            var result = false;
            var re;
            if(category == "email")
            {
                re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(value))
                {
                    result = true;
                }
            }
            if(category == 'user-name')
            {
                re = /^[a-zA-Z ]+$/;
                if(re.test(value))
                    result = true;
            }
            if(category == 'link')
            {
                re = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                if(re.test(value))
                    result = true;
            }
            if(category == 'phone')
            {
                re = /^0[0-8]\d{8}$/g;
                if(re.test(value))
                    result = true;
            }

            if(category == 'date')
            {
                if(value == "Invalid Date")
                    return false;
                return true;
            }

            if(category == 'password')
            {
                if(value.length <6)
                    return false;

                return true;
            }

            return result;
        }
        function emit(name,value){
            Event.$emit(name,value);
        }

        function refreshUser(){
            emit('refreshUser',true);
        }

        Vue.component('splash',{
            computed: {
                appname: function(){
                    return app_name;
                }
            },
            template: `
            <div>
                <img src="img/logo.png">
                <br>
                <h2>
                    {{ appname }}
                </h2>
            </div>
            `
        });

        

        Vue.component('explore',{
            data: function(){
                return {
                    query: ''
                };
            },
            template: `
            <div>
                <application-viewheader>
                    Explore
                </application-viewheader>
                <input type="text" class="form-control" placeholder="search here" v-model="query" />
                <br><br>

                <div v-show="query != ''" style="text-align: center">
                    You have searched for <b v-text="query"></b>
                </div>
            </div>
            `
        });

        Vue.component('terms',{
            template: `
            <div>
                <application-viewheader>
                    Terms and Conditions
                </application-viewheader>
                <ol>
                    <li>Mzi Framework is an opensource framework. Users are free to modify the codebase
                    to suid their needs
                    </li>
                </ol>
            </div>
            `
        });

        Vue.component('contactform',{
            data: function(){
                return {
                    names: '',
                    email: '',
                    message: ''
                };
            },
            methods: {
                reset: function() {
                    this.names = '';
                    this.email = '';
                    this.message = '';

                },

                send: function() {
                    
                    if(this.names == '')
                    {
                        error("Invalid names");
                        return false;
                    }

                    if(this.email == '')
                    {
                        error("Invalid email");
                        return false;
                    }

                    if(this.message == '')
                    {
                        error("Invalid message");
                        return false;
                    }

                    var scope = this;

                    var d = {
                            name: this.names,
                            email: this.email,
                            message: this.message
                        };

                    $.ajax({
                        type: 'POST',
                        url: api('contactUs'),
                        data: d,
                        success: function(response) {

                            if(response == 0)
                            {
                                notify('Thank you for contacting us');
                                scope.reset();
                            }
                            else
                            {
                                error("Failed to send message");
                                log(response);
                                
                            }  
                        },
                        error: function(e) {
                            
                            error("Network error");
                            log(e);
                            
                        },
                    });
                }
            },
            template: `
            <div>
                <application-viewheader>
                        Contact us
                    </application-viewheader>
                <div>
                    <h6>Your names:</h6>
                    <input type="text" v-model="names" class="form-control" value="">
                </div>
                <br>
                <div>
                    <h6>E-mail:</h6>
                    <input type="email" v-model="email" class="form-control" value="">
                </div>
                <br>
                <div>
                    <h6>Message:</h6>
                    <textarea class="form-control" v-model="message"></textarea>
                </div>
                <br>
                <div>
                    <a href="#" class="btn btn-sm btn-primary" @click="send">Send</a>

                    <a href="#" class="btn btn-sm btn-danger right-side" @click="reset">Reset</a>
                </div>
            </div>
            `
        });

        Vue.component('profile',{
            data: function(){
                return {
                    user: false,
                    refresher: false
                };
            },
            computed: {
                imgsrc: function(){
                    if(!this.user)
                        return 'img/profiles/avatar.jpg';
                    else
                        return url()+'images/profiles/'+this.user.avatar;
                },
                email_verified: function(){
                    if(!this.user)
                        return false;

                    if(this.user.email_verified_at == null)
                        return true;
                    return false;
                }
            },
            methods: {
                navigate: function(view_name){
                    showView(view_name);
                },
                verifyMail: function(){
                    //
                    var scope = this;
                    $.ajax({
                        type: 'POST',
                        url: api('resend-email-verification'),
                        headers: {"Authorization": "Bearer " + access_token()},
                        success: function(response) {

                            

                            if(response == 0){
                                notify("Verification email sent");
                            }
                            else
                            {
                                error("An error occured");
                                log(response);
                            }

                                
                        },
                        error: function(e) {
                            
                            error('Network error');
                            log(e);
                        },
                    });
                },
                refreshUser: function(){
                    var scope = this;
                    $.ajax({
                        type: 'POST',
                        url: api('user'),
                        headers: {"Authorization": "Bearer " + access_token()},
                        success: function(user) {

                            if(user == 1)
                                log("Failed to refresh user");
                            else
                            {
                                localStorage.user = str(user);
                                log("User refreshed");
                                emit('user-refreshed',user);
                            }

                                
                        },
                        error: function(e) {
                            
                            log('Network error');
                            log(e);
                        },
                    });
                },
                changeProfile: function(){
                    $('#profileImageUploader').click();
                },
                uploadProfile: function(){
                    var action = api('updateProfileImage');

                    $('#profileImageForm').attr( 'action' , api('updateProfileImage') );

                    $('#profileImageForm').ajaxForm({
                        headers: {"Authorization": "Bearer " + access_token()},
                        success: function(res,status,xhr,form){
                            if(res == 0)
                            {
                                refreshUser();
                                notify("Profile image updated");
                                
                            }
                            else
                            {
                                error('Failed to update profile image');
                                log(res);
                                log(status);
                                log(xhr);
                                log(form);
                            }
                            
                            
                        },
                        error: function(err,err1,err3){
                            error('Network Error');
                            console.log(err,err1,err3);

                        }
                    }).submit();
                }
            },
            mounted: function(){
                var scope = this;
                Event.$on('auth',function(){
                    var user = obj(localStorage.user);
                    scope.user = user;

                    scope.refresher = setInterval(scope.refreshUser,10000);

                });

                Event.$on('refreshUser',function(respond){
                    
                    if(scope.user == false)
                    {
                        if(respond)
                            error("Network Error");
                        return;
                    }

                    scope.refreshUser();

                });

                Event.$on('user-refreshed',function(user){
                    
                    scope.user = user;

                });

                Event.$on('logout',function(user){
                    
                    clearInterval(scope.refresher);

                    scope.is_a_driver = false;

                });
                
            },
            template: `
                <div>

                    <form method="post" id="profileImageForm" action="api/updateProfileImage" class="hidden" enctype="multipart/form-data">
                        
                        <input type="file" name="image" id="profileImageUploader" @change="uploadProfile">
                        
                    </form>

                    <div class="profile-header">


                        <img :src="imgsrc" @click="changeProfile">

                        <div class="profile-details">
                            <h5 v-text="user.name"></h5>
                            <p>
                                 {{ user.email }}
                            </p>
                            <button class="btn btn-sm btn-info" @click="navigate('editProfile')">edit</button>
                        </div>
                        
                    </div>
                    
                    

                    <div class="profile-links">
                        <div @click="verifyMail" v-if="email_verified" >
                            Verify Email
                            <span class="right-side bigger">></span>
                        </div>
                        <div @click="navigate('terms')">
                            Terms of Service
                            <span class="right-side bigger">></span>
                        </div>
                        <div @click="navigate('contact')" >
                            Contact
                            <span class="right-side bigger">></span>
                        </div>
                        <div @click="navigate('logout')">
                            Logout
                            <span class="right-side bigger">></span>
                        </div>
                        
                    </div>
                    <br><br><br>
                    
                </div>
            `
        });

        Vue.component('editprofile',{
            template: `
                <div>
                    <application-viewheader>
                        Edit Profile
                    </application-viewheader>
                    <div>
                        <h6>Full Name:</h6>
                        <input type="text" name="" class="form-control" id="editProfileName">
                    </div>

                    <br>

                    <div>
                        <h6>Phone:</h6>
                        <input type="text" name="" class="form-control" maxlength="20">
                    </div>

                    <br>

                    <div>
                        <a href="#" class="btn btn-sm btn-primary">Update</a>
                    </div>

                    <br>

                    <div>
                        <h6>
                            To recharge your account, use till number XXXXXX
                        </h6>
                    </div>
                </div>
            `
        });

        Vue.component('home',{
            methods: {
                navigate: function(view_name){
                    showView(view_name);
                },
                share: function(){
                    var options = {
                        message: 'check out Mzi Framework - Professional app scaffolding',
                        subject: 'Mzi Framework',
                        files: ['img/logo.png'],
                        url: 'https://mzi.eldoretartisans.club',
                        chooserTitle: 'Pick an app'
                    };

                    var onSuccess = function(result) {
                        notify("Thank you for sharing Mzi Framework");
                        log("Share completed? " + result.completed);
                        log("Shared to app: " + result.app);
                    };

                    var onError = function(msg) {
                        error("Couldn't share Mzi Framework");
                        log("Sharing failed with message: " + msg);
                    };

                    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
                }
            },
            template: `
                <div>

                <application-viewheader> 
                    Mzi Framework 
                </application-viewheader>

                <p>

                    Mzi Framework enables you to create a stable application in minutes. <br><br>

                </p>

                <br>
                <p class="middle">
                    <button class="btn btn-sm btn-success" @click="share">Spread the word</button>
                </p>
                <br>

                <h5>What's included:</h5>
                <ul>
                    
                    <li>Bootstrap - For easy styling</li>
                    <li>Font Awesome - Wide collection of icons</li>
                    <li>jQuery - Simple but robust functionalities</li>
                    <li>Notify Js - in app popup notifications</li>
                    <li>Vue JS - Two way data binding</li>
                    <li>Webpack plugin  - src/js/app.js -> www/js/index.js</li>
                    <li>Splashscreen plugin</li>
                    <li>Social sharing plugin</li>
                    <li>Notifications plugin - engage your users easily</li>
                    <li>App version plugin</li>
                    <li>Device plugin - know the user's device</li>
                    <li>Status bar plugin - modify appearence of status bar</li>
                    <li>Network information plugin</li>
                    <li>Dialogs plugin - Native alerts, promts e.t.c</li>
                    <li>Ionic keyboard plugin - Custom reliable keyboard</li>
                    <li>Ionic webview plugin - Required for custom keyboard</li>
                    <li>Vue Components - Quickly kickstart your application</li>
                </ul>
                

                

                <br>

                <p class="middle">
                    Take a look around, feel free to change things.
                    <br>
                    If you do not want a plugin, remove it by running: <br>
                    <b>cordova plugin rm [plugin name]</b>
                </p>
                

                
                    
                </div>
            `
        });

        Vue.component('about',{
            methods: {
                navigate: function(view_name){
                    showView(view_name);
                }
            },
            template: `
            <div>
                <application-viewheader>
                    About us
                </application-viewheader>

                <p>
                    Mzi framework is an opensource framework to speed up your app development. This framework was created by <a href="https://eldoretartisans.club">Eldoret Artisans</a>. To contribute to this framework, click <a href="https://mzi.eldoretartisans.club/contribute">here</a>.
                </p>

                <br>

                <p>
                    Mzi framework is highly customizable. For instance, the button below redirects the user to the contact page, or contact view, of the application. Its code is simple, utilizing the power of functional programming and vue js.
                </p>

                <br>
                <p style="text-align: center">
                <button @click="navigate('contact')" class="btn btn-sm btn-success">Contact us</button>
                </p>
            </div>
            `
        });

        Vue.component('reset',{
            data: function(){
                return {
                    email: '',
                    input: true,
                    loading: false
                };
            },
            methods: {
                navigate: function(view_name){
                    showView(view_name);
                },
                tryReset: function(){
                    if(!validate('email',this.email))
                    {
                        error("Invalid e-mail address");
                        return false;
                    }

                    var scope = this;
                    scope.input = false;
                    scope.loading = true;

                    $.ajax({
                        type: 'POST',
                        url: api('reset-password'),
                        data: {
                            email: this.email
                        },
                        success: function(response) {

                            if(response == 0)
                            {
                                info('Password reset succesfull');
                                scope.email = '';
                                showView('login');
                                
                                
                            }
                            else
                            {
                                error("Password reset failed!");
                                scope.password = '';
                                log(response);
                                
                                
                            }

                            scope.input = true;
                            scope.loading = false;
                                
                        },
                        error: function(e) {
                            
                            error("Network error");
                            log(e);

                            scope.input = true;
                            scope.loading = false;
                            
                        },
                    });
                }
            },
            template: `
                <div>
                    <application-viewheader>
                        Reset Password
                    </application-viewheader>

                    <form>
                                    
                        <h5>
                            E-mail address:
                            <input type="email" v-model="email" class="form-control">
                        </h5>
                        <br>

                        <h5 v-show="loading" id="resetText">Checking our database ...</h5>

                        <h5 v-show="input">
                            <a href="#" class="btn btn-sm btn-primary" @click="navigate('tryReset')">Reset Password</a>
                            <a href="#" class="btn btn-sm btn-link" @click="navigate('login')">Login</a>
                        </h5>
                    </form>

                    
                    <h5 v-show="input">
                    <br>
                    <br>
                        Don't have an account? 
                        <a href="#" class="btn btn-sm btn-success"  @click="navigate('register')">Register Today</a>
                    </h5>

                </div>
            `
        });

        Vue.component('login',{
            data: function(){
                return {
                    email: '',
                    password: '',
                    input: true,
                    loading: false
                };
            },
            methods: {
                login: function() {
                    if(!validate('email',this.email))
                    {
                        error("Invalid e-mail address");
                        return false;
                    }

                    if(!validate('password',this.password))
                    {
                        error("Password too short");
                        return false;
                    }

                    var scope = this;

                    scope.input = false;
                    scope.loading = true;

                    $.ajax({
                        type: 'POST',
                        url: api('login'),
                        data: {
                            email: this.email,
                            password: this.password
                        },
                        success: function(response) {
                            if(response == 1)
                            {
                                error("Login Failed");
                                log(response);
                                
                            }
                            else
                            {
                                localStorage.token = str(response);
                                Event.$emit('login-success',response);
                                notify('Welcome back');
                                scope.reset();
                                
                            }
                            scope.input = true;
                            scope.loading = false;  
                        },
                        error: function(e) {
                            
                            error("Network error");
                            log(e);

                            scope.input = true;
                            scope.loading = false;
                            
                        },
                    });

                    
                },
                reset: function() {

                    this.password = '';
                    this.email = '';
                    return true;

                },
                navigate: function(name){
                    return showView(name);
                }
            },
            template: `
                <div>
                    <application-viewheader>
                        Login
                    </application-viewheader>
                    <h5>
                        E-mail address:
                        <input type="text" class="form-control" v-model="email">
                    </h5>
                    <br>

                    <h5>
                        Password:
                        <input type="password" v-model="password" class="form-control">
                    </h5>
                    <br>

                    <h5 v-show="loading">Logging you in securely ...</h5>

                    <h5 v-show="input">
                        <a href="#" class="btn btn-sm btn-primary" @click="login">Login</a>
                        <a href="#" class="btn btn-sm btn-link" @click="navigate('reset')">Forgot Password?</a>
                        
                    </h5>

                    <br>
                    <h5 v-show="input">Don't have an account? 
                    <a href="#" class="btn btn-sm btn-success" @click="navigate('register')">Register Today</a>
                    </h5>
                    <br>
                </div>
            `
        });

        Vue.component('register',{
            data: function(){
                return {
                    names: '',
                    email: '',
                    password: '',
                    input: true,
                    loading: false
                };
            },
            methods: {
                navigate: function(view_name){
                    showView(view_name);
                },
                reset: function() {
                    this.names = '';
                    this.password = '';
                    this.email = '';
                    return true;

                },
                register: function(){
                    if(!validate('user-name',this.names))
                    {
                        error("Name is invalid");
                        return false;
                    }
                    if(!validate('email',this.email))
                    {
                        error("Invalid e-mail address");
                        return false;
                    }
                    
                    if(!validate('password',this.password))
                    {
                        error("Password too short");
                        return false;
                    }

                    var scope = this;
                    scope.input = false;
                    scope.loading = true;

                    $.ajax({
                        type: 'POST',
                        url: api('register'),
                        data: {
                            name: this.names,
                            email: this.email,
                            password: this.password,
                            password_confirmation: this.password

                        },
                        success: function(response) {

                            if(response == 0)
                            {
                                notify('Registration success');
                                scope.reset();
                                showView('login');
                                
                                
                            }
                            else
                            {
                                error("Registration Failed");
                                scope.password = '';
                                log(response);
                                
                                
                            }

                            scope.input = true;
                            scope.loading = false;
                                
                        },
                        error: function(e) {
                            
                            error("Network error");
                            log(e);

                            scope.input = true;
                            scope.loading = false;
                            
                        },
                    });
                    
                }
            },
            template: `
                <div>
                    <application-viewheader>
                        Register
                    </application-viewheader>

                    <h5>
                        Full Name:
                        <input type="text" class="form-control" v-model="names">
                    </h5>


                    <h5>
                        E-mail address:
                        <input type="text" class="form-control" v-model="email">
                    </h5>

                    <h5>
                        Password:
                        <input type="password" class="form-control" v-model="password">
                    </h5>

                    <h5 v-show="loading" id="registerText">Creating your account ...</h5>

                    <h5 v-show="input">
                        <a href="#" class="btn btn-sm btn-primary" @click="register">Register</a>
                        <span class="right-side">
                            Have an account? 
                            <a href="#" class="btn btn-sm btn-success" @click="navigate('login')">Login</a>
                        </span>
                    </h5>
                </div>
            `
        });

        Vue.component('application-header',{

            data: function() {
                return {
                    displayed: 0,
                };
            },

            methods: {
                showNav: function(){
                    this.displayed = 100 + '%';
                },
                closeNav: function() {
                    this.displayed = 0 + '%';
                },
                navigate: function(view_name){
                    this.closeNav();
                    Event.$emit('showView',view_name);
                    log("header navigating to " + view_name);
                }

            },
                
            template: `
                

                <div id="application-header">

                    <h4 style="">

                        <p id="backButton" class="hidden ">< Back</p>

                        <i class="fa fa-bars right-side" @click="showNav" style="margin:0.8em 1em; display: block;"></i>

                        <img src="img/logo.png" @click="navigate('home')" >

                        

                        <div id="myNav" class="overlay" :style="{ width: displayed}">
                            <a href="#" class="closebtn" @click="closeNav">&times;</a>
                            <div class="overlay-content">
                                <a href="#" @click="navigate('about')">About</a>
                                <a href="#" @click="navigate('contact')">Contact</a>
                                <a href="#" @click="navigate('terms')">Terms</a>
                                
                            </div>
                        </div>
                    </h4>

                </div>

            `
        });

        Vue.component('application-body',{
            data: function(){
                return {
                    user: false,
                    views: [],
                    view: 'splash',
                    history: [],
                    route: 'home',
                    max: 15
                };
            },
            methods: {
                display: function(name){

                    for(var i=0; i<this.views.length; i++)
                    {
                        var v = this.views[i];
                        v.shown = v.name == name;
                    }
                    this.view = name;
                    this.history.push(name);
                    Event.$emit('viewShown',name);

                }
            },
            template: `
                
                <div id="application-body">
                    
                    <slot></slot>

                </div>

            `,
            created: function() {
                this.views = this.$children;

                var scope = this;

                Event.$on('auth',function(){
                    scope.user = true;
                    showView(scope.route);
                });

                Event.$on('showView',function(name){

                    log("Changing view to " + name);

                    if(name == 'logout')
                    {
                        showView('splash');
                        notify("Logging you out");
                        scope.user = false;
                        Event.$emit('logout');
                        return;
                    }


                    for(var i=0; i<scope.views.length; i++)
                    {
                        var v = scope.views[i];

                        if(v.name != name)
                            continue;

                        switch(v.auth){
                            case 'required':
                                if(!scope.user)
                                {
                                    scope.target = name;
                                    log("View change failed as auth is required for " + name);
                                    return scope.display('login');
                                    
                                }
                                else
                                {
                                    log("View change success :: with auth");
                                    return scope.display(name);
                                    
                                }
                                break;

                            case 'none':
                                if(scope.user)
                                {
                                    error("Access restricted");
                                    log("View change failed as user is authenticated " + name);
                                }
                                else
                                {
                                    log("View change success :: no auth");
                                    return scope.display(name);
                                    
                                }
                                break;

                            default:
                                return scope.display(name);
                        }
                        break;
                    }

                    scope.view = name;

                });

                Event.$on('login-success',function(data){
                    $.ajax({
                        type: 'POST',
                        url: api('user'),
                        headers: {"Authorization": "Bearer " + data.access_token},
                        success: function(response) {

                            localStorage.user = str(response);

                            Event.$emit("auth");


                                
                        },
                        error: function(e) {
                            
                            error("Login failed! try again later");
                            log(e);
                            
                        },
                    });


                });
            },
            mounted: function(){
                
                var scope = this;
                document.addEventListener("backbutton", function(e){
                    if(scope.view == 'home' || scope.view == 'splash')
                    {
                        log("Exiting application");
                        e.preventDefault();
                        navigator.app.exitApp();
                    }
                    else
                    {
                        log("App exit aborted");
                        showView('home');
                    }
                }, false);
            }
        });

        Vue.component('application-viewheader',{
            methods: {
                navigate: function(name){
                    return showView(name);
                }
            },
            template: `
                
                <h4 style="text-align: right">
                    
                    <slot></slot>

                </h4>

            `
        });

        Vue.component('application-view',{

            props: {
                name: { required: true},
                active: { default: false},
                auth: { default: 'all'}
            },

            data: function() {
                return {
                    shown: this.active
                };
            },

            computed: {
                
                isActive: function(){
                    return this.shown;
                }
            },

            methods: {
                navigate: function(name){
                    return showView(name);
                }
            },
                
            template: `
                
                <div :class="['application-view '+this.name]" v-show="shown" :name="name">
                    
                    <slot></slot>

                </div>

            `
        });

        Vue.component('application-footer',{
    
            data: function() {
                return {
                    shown: true
                };
            },
            computed: {

                isShown: function(){
                    return this.shown;
                }

            },
            template: `
                
                <div id="application-footer" v-show="isShown">
                    <slot></slot>
                </div>

            `
        });

        Vue.component('application-footertab',{
            props:{
                name: {required: true},
                icon: {required: true},
                active: {default: false}
            },

            data: function() {
                return {

                    focus: this.active

                };
            },
            computed: {
                class_name: function() {
                    if(this.focus)
                        return 'fa fa-'+this.icon+' active';
                    else
                        return 'fa fa-'+this.icon;
                }
            },
                
            template: `
                
                <div class="application-footerTab" :name="name" @click="goToPage(name)">
                    <i :class="class_name"></i>
                </div>

            `,
            methods: {
                goToPage: function(name){
                    Event.$emit('showView',name);
                }
            },
            mounted: function() {

                var scope = this;

                Event.$on('viewShown',function(name){

                    scope.focus = scope.name == name;


                });

            }
        });

        mzi = new Vue({
            el: '#application',
            data: {
                user: false,
                launches: 0
            },
            created: function() {

                $('#application').removeClass('hidden');
                this.initialize();

                if(this.launches == 0)
                {
                    cordova.plugins.notification.local.schedule({
                        title: 'Welcome to ' + app_name + ' v'+app_version,
                        text: 'Powered by Mzi Framework',
                        foreground: true
                    });
                }

                this.launches += 1;

                localStorage.launches = str(this.launches);
                
                setInterval(this.loadData,10000);
            },
            mounted: function() {

                this.testAuth();
                //showView('home');
                setTimeout(showView,1900,'home');
                var scope = this;
                Event.$on('logout',function(){

                    scope.user = false;
                    if(exists('user'))
                    {
                        localStorage.removeItem('user');
                    }

                    setTimeout(showView,2500,'home');

                });
            },
            methods: {
                initialize: function(){
                    this.loadData();
                },
                loadData: function(){
                    if(exists('user'))
                    {
                        this.user = obj(localStorage.user);
                    }

                    if(exists('launches'))
                    {
                        this.launches = obj(localStorage.launches);
                    }

                    
                },
                testAuth: function(){


                    if(localStorage.token != undefined && localStorage.user != undefined)
                    {
                        Event.$emit("auth");
                        log("authenticated user found");
                    }
                    else
                    {
                        log("No authenticated user");
                    }

                }
            }

        });

    }
};

app.initialize();