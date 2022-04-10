--game.Players["plainenglish"].TeamColor = BrickColor.new("Sand red");

local Players = game:GetService("Players");
local HttpService = game:GetService("HttpService");

local function CreatePlayerInfo(Player)
	local X = -1;
	local Y = -1;
	local Alt = 0;

	local VX = 0;
	local VY = 0;

	local Health = "0%";

	if Player.Character and Player.Character:FindFirstChild("HumanoidRootPart") then
		X = Player.Character.HumanoidRootPart.Position.X;
		Y = Player.Character.HumanoidRootPart.Position.Z;
		Alt = Player.Character.HumanoidRootPart.Position.Y;

		VX = Player.Character.HumanoidRootPart.Velocity.X;
		VY = Player.Character.HumanoidRootPart.Velocity.Z;
	end

	if Player.Character and Player.Character:FindFirstChild("Humanoid") then
		Health = math.round((Player.Character.Humanoid.Health / Player.Character.Humanoid.MaxHealth) * 100).."%";
	end

	local TeamColor = Player.TeamColor or BrickColor.Black();
	TeamColor = TeamColor.Color;

	return {
		Name = Player.Name,
		Position = {
			X = math.round(X),
			Y = math.round(Y),
			Alt = math.round(Alt)
		},
		Velocity = {
			X = math.round(VX),
			Y = math.round(VY),
		},
		TeamColor = string.format("rgb(%s,%s,%s)", math.round(TeamColor.R * 255), math.round(TeamColor.G * 255), math.round(TeamColor.B * 255)),
		LocalPlayer = Player == Players.LocalPlayer,
		TeamMate = Player.Team == Players.LocalPlayer.Team,
		Health = Health
	}
end

local function LocalData()
	local Health = "0%";
	local Team = "Neutral";

	if Players.LocalPlayer.Character and Players.LocalPlayer.Character:FindFirstChild("Humanoid") then
		Health = math.round((Players.LocalPlayer.Character.Humanoid.Health / Players.LocalPlayer.Character.Humanoid.MaxHealth) * 100).."%";
	end

	if Players.LocalPlayer.Team then
		Team = Players.LocalPlayer.Team.Name;
	end

	return {
		Name = Players.LocalPlayer.Name,
		TeamName = Team,
		Health = Health
	}
end

local function ListBolts()
	if game.GameId ~= 539067902 then return {} end

	local Bolts = {};
	for _, BoltInstance in pairs(game:GetService("Workspace").ActiveBolts:GetChildren()) do
		if BoltInstance.Name == "C4" or BoltInstance.Name == "Dynamite" or BoltInstance.Name == "Grenade" then
			table.insert(Bolts, {"Explosive", math.round(BoltInstance.Position.X), math.round(BoltInstance.Position.Z)});
		elseif BoltInstance.Name == "Shell" or BoltInstance.Name == "Missile" then
			table.insert(Bolts, {"Projectile", math.round(BoltInstance.Position.X), math.round(BoltInstance.Position.Z)});
		elseif BoltInstance.Name == "Slug" then
			table.insert(Bolts, {"MinorProjectile", math.round(BoltInstance.Position.X), math.round(BoltInstance.Position.Z)});
		end
	end
	return Bolts;
end

local function ListTAP()
	if game.GameId ~= 539067902 then return {} end

	local Obstacles = {};
	for _, Obj in pairs(game:GetService("Workspace").TerrainAp:GetChildren()) do
		if Obj.Name == "CaptureFlag" then
			local Gui = Obj.CaptureGui.Captured:FindFirstChild("Name");
			local colour = Obj.CaptureGui.Captured:FindFirstChild("Gauge");
			table.insert(Obstacles, {"CapturePoint", math.round(Obj.Position.X), math.round(Obj.Position.Z), Gui.Text, string.format("rgb(%s,%s,%s)", math.round(colour.BackgroundColor3.R * 255), math.round(colour.BackgroundColor3.G * 255), math.round(colour.BackgroundColor3.B * 255))});
		elseif Obj.Name == "Rock" then
			table.insert(Obstacles, {"Rock", math.round(Obj.Position.X), math.round(Obj.Position.Z)});
		end
	end
	return Obstacles;
end

local function ListExplosions()
	local Explosions = {};

	for _, Explosion in pairs(game:GetService("Workspace"):GetChildren()) do
		if Explosion:IsA("Explosion") then
			table.insert(Explosions, {math.round(Explosion.Position.X), math.round(Explosion.Position.Z)});
		end
	end

	return Explosions;
end

while task.wait(0.1) do
	local Data = {
		PlayerLocations = {
			
		},
		LocalData = LocalData(),
		Bolts = ListBolts(),
		TAP = ListTAP(),
		Explosions = ListExplosions()
	};

	for _, Player in ipairs(Players:GetPlayers()) do
		table.insert(Data.PlayerLocations, CreatePlayerInfo(Player));
	end

	writefile(".ApMap", HttpService:JSONEncode(Data))
end
