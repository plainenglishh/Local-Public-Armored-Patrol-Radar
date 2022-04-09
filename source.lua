--game.Players["plainenglish"].TeamColor = BrickColor.new("Sand red");

local Players = game:GetService("Players");
local HttpService = game:GetService("HttpService");

local function CreatePlayerInfo(Player)
	local X = -1;
	local Y = -1;
	
	if Player.Character and Player.Character:FindFirstChild("HumanoidRootPart") then
		X = Player.Character.HumanoidRootPart.Position.X;
		Y = Player.Character.HumanoidRootPart.Position.Z;
	end

	local TeamColor = Player.TeamColor or BrickColor.Black();
	TeamColor = TeamColor.Color;

	return {
		Name = Player.Name,
		Position = {
			X = X,
			Y = Y
		},
		TeamColor = string.format("rgb(%s,%s,%s)", TeamColor.R * 255, TeamColor.G * 255, TeamColor.B * 255),
		LocalPlayer = Player == Players.LocalPlayer
	}
end

local function LocalData()
	local Health = "0%";
	local Team = "Neutral";

	if Players.LocalPlayer.Character and Players.LocalPlayer.Character:FindFirstChild("Humanoid") then
		Health = ((Players.LocalPlayer.Character.Humanoid.Health / Players.LocalPlayer.Character.Humanoid.MaxHealth) * 100).."%";
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

while task.wait(0.1) do
	local Data = {
		PlayerLocations = {
			
		},
		LocalData = LocalData()
	};

	for _, Player in ipairs(Players:GetPlayers()) do
		table.insert(Data.PlayerLocations, CreatePlayerInfo(Player));
	end

	writefile(".ApMap", HttpService:JSONEncode(Data))
end
