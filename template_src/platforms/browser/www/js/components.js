
window.Event = new Vue();

Vue.component('application-header',{

	data() {
		return {
			displayed: 0,
		};
	},

	methods: {
		showNav(){
			this.displayed = 100 + '%';
		},
		closeNav() {
			this.displayed = 0 + '%';
		},
		navigate(view_name){
			this.closeNav();
			Event.$emit('showView',view_name);
			log("header navigating to " + view_name);
		}

	},

	mounted() {
		console.log("Header component mounted");
	},
		
	template: `
		

		<div id="application-header">

            <h4 style="">

                <p style="float: left; margin:0.8em 0 0.8em 0.5em;" id="backButton" class="hidden goToPage" name="rides">< Back</p>

                <i class="fa fa-bars right-side" @click="showNav" style="margin:0.8em 1em; display: block;"></i>

                <img src="logo256.png" @click="navigate('about')" >

                

                <div id="myNav" class="overlay" :style="{ width: displayed}">
                    <a href="#" class="closebtn" @click="closeNav">&times;</a>
                    <div class="overlay-content">
                        <a href="#" @click="navigate('about')">About</a>
                        <a href="#" @click="navigate('contact')">Contact</a>
                        <a href="#" @click="navigate('pricing')">Pricing</a>
                        <a href="#" @click="navigate('terms')">Terms</a>
                        
                    </div>
                </div>
            </h4>

        </div>

	`
});

Vue.component('profile',{
	template: `
		<div>

			<form method="post" action="api/updateProfileImage" class="hidden" id="profileImageForm" enctype="multipart/form-data">
	            <input type="hidden" name="_token" value="" id="profileImageToken">
	            <input type="file" name="image" id="profileImageUploader">
	        </form>

	        <div class="profile-header">


	            <img src="img/profiles/avatar.jpg" title="change">

	            <div class="profile-details">
	                <h5>Nicollo Marish </h5>
	                <p>nicollo@lughayetu.net</p>
	            </div>
	            
	        </div>
	        
	        

	        <div class="profile-links">

	            <div class="goToPage openAdmin hidden" name="admin">
	                Admin Panel
	                <span class="right-side bigger">></span>
	            </div>
	            <div class="goToPage" name="terms">
	                Terms of Service
	                <span class="right-side bigger">></span>
	            </div>
	            <div class="goToPage" name="contact">
	                Contact
	                <span class="right-side bigger">></span>
	            </div>
	            <div class="goToPage" name="logout">
	                Logout
	                <span class="right-side bigger">></span>
	            </div>
	            
	        </div>
	        <br><br><br>
			
		</div>
	`
});

Vue.component('editProfile',{
	template: `
		<div>
			<div>
                <h6>Full Name:</h6>
                <input type="text" name="" class="form-control" id="editProfileName">
            </div>

            <br>

            <div>
                <h6>Phone:</h6>
                <input type="text" name="" class="form-control" maxlength="20" id="editProfilePhone">
            </div>

            <br>

            <div>
                <a href="#" class="btn btn-sm btn-primary" onclick="updateProfile()">Update</a>
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
	template: `
		<div>

		<p class="middle"> 
            Welcome to 3COB, the primier Taxi hailing company in Kenya. 
        </p>

        <img src="img/car2.png" class="center-70">

        <p style="text-align: center;">
            Get speedy, safe, affordable and convinient travels from the comfort of your home or work place and stand a chance to win a free ride when you share the experience on twitter. 
            <br>
            Choose whether you want a male or female driver. Incredible!
        </p>

        <br>

        <p>
            <a href="tel://0724101971" class="btn btn-sm btn-primary">CALL</a>
            <span class="btn btn-sm btn-success right-side goToPage" name="rides">GET A RIDE</span>
        </p>

        <br>

        <p>
            Pay conviniently via M-PESA or Cash at no extra cost.
        </p>

        <br>

        <p class="middle">
            3COB, You are our priority
        </p>
			
		</div>
	`
});

Vue.component('about',{
	template: `
		<div>

		<h6>
            3COB is a premier Taxi hailing company in Kenya that provides you with speedy, convinient and aaffordable rides around the city. Our drivers are honorble people ready to take you wherever the road calls. 
        </h6>

        <br>

        <h6>
            To call a taxi, click <a href="#" class="btn btn-sm btn-link goToPage" name="rides">here</a> or call <a href="tel://0724101971">0724101971</a> to place a taxi request. At 3COB, you are our priority.
        </h6>
			
		</div>
	`
});

Vue.component('reset',{
	template: `
		<div>

		<form>
                        
            <h5>
                E-mail address:
                <input type="text" name="email" id="resetEmail" class="form-control">
            </h5>
            <br>

            <h5 class="hidden" id="resetText">Checking our database ...</h5>

            <h5>
                <a href="#" class="btn btn-sm btn-primary" id="tryReset">Reset Password</a>
                <a href="#" class="btn btn-sm btn-link goToPage" name="login">Login</a>
            </h5>
        </form>

        <br>
        <br>
        <h5>
            Don't have an account? 
            <a href="#" class="btn btn-sm btn-success goToPage" name="register">Register Today</a>
        </h5>

		</div>
	`
});

Vue.component('contact',{
	template: `
		<div>
			<form method="POST" action="api/contactUs" id="contactUsForm">

                <input type="hidden" name="_token" id="contactUsToken" value="">

                <div>
                    <h6>Your name:</h6>
                    <input type="text" name="name" class="form-control" id="contactUsName" value="">
                </div>

                <br>

                <div>
                    <h6>E-mail:</h6>
                    <input type="email" name="email" class="form-control" id="contactUsEmail" value="">
                </div>

                <br>

                <div>
                    <h6>Message:</h6>
                    <textarea class="form-control" name="message" id="contactUsMessage"></textarea>
                </div>

                <br>

                <div>
                    <a href="#" class="btn btn-sm btn-primary" onclick="contactUs()">Send</a>

                    <a href="#" class="btn btn-sm btn-danger right-side" onclick="clearContactUsForm()">Clear</a>
                </div>


                
            </form>
		</div>
	`
});

Vue.component('login',{
	data(){
		return {
			email: 'timo@lughayetu.net',
			password: 'secret'
		}
	},
	methods: {
		login() {
			if(this.email == '')
				return error('Invalid email');

			if(this.password == '' || this.password.length < 6)
				return error('Invalid password');


			$.ajax({
		        type: 'POST',
		        url: url()+'login',
		        data: {
					email: this.email,
					password: this.password
				},
		        success: function(response) {

		            notify('Login success');
		    		console.log(response);
		                
		        },
		        error: function() {
		            
		            error("Login failed! try again later");
		    		log(e);
		            
		        },
		    });

			
		},
		reset() {

			this.password = '';
			this.email = '';
			return true;

		}
	},
	template: `
		<div>
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

	        <h5 class="hidden">Logging you in securely ...</h5>

	        <h5>
	            <a href="#" class="btn btn-sm btn-primary" @click="login">Login</a>
	            <a href="#" class="btn btn-sm btn-link" @click="reset">Forgot Password?</a>
	            
	        </h5>

	        <br>
            <h5>Don't have an account? 
            <a href="#" class="btn btn-sm btn-success goToPage" name="register">Register Today</a>
            </h5>
            <br>
        </div>
	`
});

Vue.component('register',{
	data(){
		return {
			email: '',
			password: ''
		}
	},
	methods: {
		
	},
	template: `
		<h5>
          
          Register component
            
        </h5>
	`
});

Vue.component('application-header',{

	data() {
		return {
			displayed: 0,
		};
	},

	methods: {
		showNav(){
			this.displayed = 100 + '%';
		},
		closeNav() {
			this.displayed = 0 + '%';
		},
		navigate(view_name){
			this.closeNav();
			Event.$emit('showView',view_name);
			log("header navigating to " + view_name);
		}

	},
		
	template: `
		

		<div id="application-header">

            <h4 style="">

                <p style="float: left; margin:0.8em 0 0.8em 0.5em;" id="backButton" class="hidden goToPage" name="rides">< Back</p>

                <i class="fa fa-bars right-side" @click="showNav" style="margin:0.8em 1em; display: block;"></i>

                <img src="logo256.png" @click="navigate('about')" >

                

                <div id="myNav" class="overlay" :style="{ width: displayed}">
                    <a href="#" class="closebtn" @click="closeNav">&times;</a>
                    <div class="overlay-content">
                        <a href="#" @click="navigate('about')">About</a>
                        <a href="#" @click="navigate('contact')">Contact</a>
                        <a href="#" @click="navigate('pricing')">Pricing</a>
                        <a href="#" @click="navigate('terms')">Terms</a>
                        
                    </div>
                </div>
            </h4>

        </div>

	`
});

Vue.component('application-body',{
	data(){
		return {
			user: false,
			views: [],
			view: 'splash',
			route: 'home'
		}
	},
	methods: {

	},
	template: `
		
		<div id="application-body">
			
			<slot></slot>

		</div>

	`,
	created() {
		this.views = this.$children;
	},
	mounted() {



		

		var scope = this;

		Event.$on('auth',function(e){
			scope.user = true;
			showView(scope.route);
		});

		Event.$on('showView',function(name){

			for(var i=0; i<scope.views.length; i++)
			{
				var v = scope.views[i];

				switch(v.auth){
					case 'required':
						if(!scope.user)
						{
							info("Login to proceed");
							scope.target = name;
							showView('login');
						}
						else
							v.shown = v.name == name;

					case 'none':
						if(scope.user)
							error("Access restricted");
						else
							v.shown = v.name == name;

					default:
						v.shown = v.name == name;
				}

				continue;

				//check auth requirements for view {none,required,all}
					//if pass 
						//show view
					//else
						//set as route
						//show login/reg
							//on auth
							//show route

				if(v.name == name)
				{
					v.shown = true;
				}
				else
				{
					v.shown = false;
				}
			}

			scope.view = name;

		});

		setTimeout(function(){
			Event.$emit('showView','login');
		},2500);

		


	}
});

Vue.component('application-viewheader',{
		
	template: `
		
		<h4>
			
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

	data() {
		return {
			shown: this.active
		};
	},

	computed: {
		
		isActive(){
			return this.shown;
		}
	},
		
	template: `
		
		<div :class="['application-view '+this.name]" v-show="isActive" :name="name">
			
			<slot></slot>

		</div>

	`,
	mounted(){


		
		
	}
});

Vue.component('application-footer',{
	
	data() {
		return {
			shown: false
		};
	},
	computed: {

		isShown(){
			return this.shown;
		}

	},
	methods: {

	},
	template: `
		
		<div id="application-footer" v-show="isShown">
			<slot></slot>
        </div>

	`,
	mounted() {

		var scope = this;

		Event.$on('auth',function(data){
			scope.shown = true;
		});

	}
});

Vue.component('application-footertab',{
	props:{
		name: {required: true},
		icon: {required: true},
		active: {default: false}
	},

	data() {
		return {

			focus: this.active

		};
	},
	computed: {
		class_name() {
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
		goToPage(name){
			Event.$emit('showView',name);
		}
	},
	mounted() {

		var scope = this;

		Event.$on('showView',function(name){

			scope.focus = scope.name == name;


		});

	}
});