# Mzi Framework

Have you worked on a hybrid application and got tired of the amount of boilerplate you have to deal with to have a minimum viable product/prototype? Not anymore!

## About Mzi

Mzi Framework is a comprehensive cordova template that will enable you to generate the necessary boilerplate code you need to make an application.

## Plugins included

Setting up plugins can be daunting, and its easy to forget an important one especially if you work on several projects.

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

## Others included

- Vue JS
- jQuery
- Font awesome
- Bootstrap
- Notify JS

## Installation

You are required to have npm 8+ and android sdk installed.
To install this template, run the following command:

```javascript
cordova create todo club.eldoretartisans.hello Todo --template https://github.com/chiefbrob/mzi
```


## Code syntax

The markup language used is vue because of its immense benefits. 

Inside www/index.html create a new view

```vue
<application-view name="todo" auth="none">
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
		create(){
			if(this.input.length>0)
			{
				this.todos.push(input);
				this.input = '';
				notify('Todo created');
			}
		},
		delete(t){
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
        		<button @click="create" :disabled="input.length = 0">Create</button>
        	</p>

        	<div v-for="t in todos">
        		{{ t }} <i class="fa fa-trash right-side" @click="delete(t)"></i>
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

The navigate method is a custom method for that in fires the showView event.
To navigate within your views from within javascript code

```javascript
Event.$emit('showView', 'todo');
//or
showView('todo');
```

To persist data

```javascript
set('todos',{'go to the bank','go shopping'});

//some code

var saved_todos = fetch('todos');

```


## Usage

Mzi framework creates a cordova application. 


```javascript
cordova run browser
cordova run android
```

## Deployment

Change the vue version to production by referencing js/vue.min.js in your index.html

Currently working on the backend with laravel to complete the development chain. This can be found [here](https://github.com/chiefbrob/mzae) once made available

## Contribution

If there exists bugs or points of correction, kindly email [Brian Obare](mailto:brianobare@gmail.com). All issues raised will be looked into and addressed.

## License

I dont know much, just use it and do good. With love from [Eldoret Artisans](https://eldoretartisans.club)