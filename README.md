<p align="center">
  <h1>LPAPR System</h1>
  <h4>Local Public Armored Patrol Radar</h4>
  <br/>
</p>

Welcome to the main repository for LPAPR, a radar system for Armored Patrol v9.5. This project is developed and maintained by [plainenglish](https://www.roblox.com/users/56098303/profile).

This Repro hosts:
- The source code for the Rendering Engine.
- The source for the Client files.
- The viewer application.

## Using the Radar

### Installation

Installing the system is easy, simply clone or download this repro to your file system.<br>
**Note:** You do not need to worry about the renderer.js file as this is not used locally.

### Usage

1. Start the run batch file.
2. Go to localhost:8111/viewer.html (Change the port / hostname if applicable)
3. Run the script in the viewer page in a script executor such as Synapse X.
4. Press the start button after putting in the data url. The default URL is already in the box.

### Configuration

In the config.json file found in the main directory, you will find various options you can change.<br><br>
**IT IS VITAL THAT YOU CHANGE THE WORKSPACE FOLDER TO YOUR OWN SYNAPSE X WORKSPACE FOLDER.**

## Developers

### Diagram

![](https://cdn.discordapp.com/attachments/785436858514407425/962541187896598568/unknown.png)

### .APMAP File Structure

An .apmap file (The file that represents a radar snapshop/scan) uses the JSON format and looks like:
```json
{
	"LocalData":{
		"TeamName":"Red Team",
		"Health":"100%",
		"Name":"plainenglish"
	},
		"Explosions":[
			[572,468]
		],
		"TAP":[
			["CapturePoint",2677,143,"Alpha","rgb(0,170,255)"],
			["Rock",2769,475]
		],
		"PlayerLocations":[
			{
				"LocalPlayer":true,
				"Name":"plainenglish",
				"Velocity":{"Y":-0,"X":-0},
				"Position":{"Alt":136,"Y":182,"X":167},
				"Health":"100%",
				"TeamMate":true,
				"TeamColor":"rgb(196,40,28)"
			}
		],
		"Bolts":[
			["Explosive",549,307],
			["Projectile",232,393]
		]
	}
}
```
You may not understand what this means, but the script does. It is not important to understand

### Using the renderer in external projects

You are free to the the rendering engine in your own personal projects. You can do this by inserting this at the top of your HTML head:
```html
<script src="https://cdn.jsdelivr.net/gh/plainenglishh/Armored-Patrol-Radar/renderer.js"></script>
```
you can then call the "RenderFrame" function with the following peramaters in any other script;
```js
RenderFrame(<.APMAP Text>, <Canvas Id>);
```