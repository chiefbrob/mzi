# Mzi Framework

Have you worked on a hybrid application and got tired of the amount of scaffolding you have to deal with to have a minimum viable product/prototype? Not anymore!

## About Mzi

Mzi Framework is a comprehensive cordova template that will enable you to generate the necessary scaffolding code you need to make an application.

## Plugins included

Its easy to forget a necessary plugin, especially if you work on several projects - so we've got you covered.

1. cordova-plugin-webpack
2. cordova-plugin-camera
3. cordova-plugin-splashscreen
4. cordova-plugin-x-socialsharing
5. cordova-plugin-app-version
6. cordova-plugin-device
7. cordova-plugin-statusbar
8. cordova-plugin-network-information
9. cordova-plugin-dialogs
10. cordova-plugin-local-notification
11. cordova-plugin-ionic-webview
12. cordova-plugin-ionic-keyboard

## Platforms included

+ Android 
+ Browser (for development)

## Platforms that can be added

To add a new platform:

```javascript
cordova add ios
```

+ ios (Mac needed)
+ osx (Mac needed)
+ windows (Windows 10 PC required)

* You can use [virtual box](https://virtualbox.org) if you don't have access to a Mac

## Others included

- Vue JS
- jQuery
- Font awesome
- Bootstrap
- Notify JS

## Installation

You are required to have the latest npm, cordova and android sdk installed.
To install this template, run the following command:

```javascript
cordova create todo club.eldoretartisans.todo Todo --template https://github.com/chiefbrob/mzi
```


## Code syntax

The markup language used is vue because of its immense benefits. 

Inside www/index.html create a new view

```vue
<application-view name="todo">
    <todo></todo>
</application-view>
```

Inside www/js/app.js create a new component 


```vue
Vue.component('todo',{
	data(){
		return {
			todos: [],
			input: ''
		};
	},
	methods: {
		create_todo(){
			this.todos.push(input);
			this.input = '';
			notify('Todo created');
		},
		delete_todo(t){
			var new_todos = [];
			for(var i=0; i<this.todos.length; i++)
			{
				if(t != this.todos[i])
					new_todos.push(this.todos[i]);

			}
			this.todos = new_todos;
			error("Todo deleted");
		}
	},
    template: `
    <div>
        <application-viewheader>
            ToDo App
        </application-viewheader>
        
        <div>
        	<p style="text-align: center">
        		<input type="text" class="form-control" placeholder="create todo" v-model="input" />
        		<button @click="create_todo" :disabled="input.length == 0">Create</button>
        	</p>

        	<div v-for="t in todos">
        		{{ t }} <i class="fa fa-trash right-side" @click="delete_todo(t)"></i>
        	</div>
        </div>
    </div>
    `
});
```

In the home component, add a button that redirects to your todo

```vue
<button @click="navigate('todo')">Show Todo</button>
```

The navigate method is a custom method that in fires the showView event.
To navigate within your views from within javascript code

```javascript
Event.$emit('showView', 'todo');
//or
showView('todo');
```

If the view requires authentication, it would be checked first.

To persist data in local storage

```javascript
set('todos',{'go to the bank','go shopping'});

//some code

var saved_todos = fetch('todos');

```

### Working with apis

First set your url in the url() function then update the api endpoint. 

```javascript
$.ajax({
    type: 'POST',
    url: api('contactUs'), //https://www.yoursite.com/web-api/contactUs
    data: {
        name: this.names,
        email: this.email,
        message: this.message
    },
    success: function(response) {

        if(response == 0)
        {
            notify('Thank you for contacting us');
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

```


## Usage

Mzi framework creates a cordova application. 


```javascript
cordova run browser
cordova run android
```

For futher reference, kindly visit [Apache Cordova's](https://cordova.apache.org/) main site

## Deployment

Change the vue version to production by referencing js/vue.min.js in your index.html

Currently working on the backend with laravel to complete the development chain. This can be found [here](https://github.com/chiefbrob/mzae) once made available

## Sponsors

We would like to extend our thanks to the following sponsors for helping fund on-going Mzi framework development:

- **[Eldoret Artisans](https://eldoretartisans.club/)**

## Contribution

If there exists bugs or points of correction, kindly email [Brian Obare](mailto:brianobare@gmail.com). All issues raised will be looked into and addressed.

## License

Mzi framework is an open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).