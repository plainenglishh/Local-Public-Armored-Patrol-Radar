function RenderFrame(Data) {
	Data = JSON.parse(Data);
	
	function ClearCanvas() {
		Pen.clearRect(0, 0, Canvas.width, Canvas.height);
	}

	function RobloxCoordsToRadar(X, Y) {
		var MapX = MapXInput.value / Canvas.width;
		var MapY = MapYInput.value / Canvas.height;

		var OffsetX = MapXOffset.value / MapX;
		var OffsetY = MapYOffset.value / MapY;

		var ViewX = Canvas.width - (X / MapX) + OffsetX;
		var ViewY = Canvas.height - (Y / MapY) + OffsetY;

		return {X: ViewX, Y: ViewY};
	}	

	// Viewport

	ClearCanvas();

	Pen.drawImage(MapImg, 0, 0);

	// Projectiles //

	Pen.font = "12px Consolas, Courier Bold, Courier";
	Pen.fillStyle = `rgb(255,255,255)`;

	for (const BoltInfoIndex in Data.Bolts) {
		const BoltInfo = Data.Bolts[BoltInfoIndex];

		var BoltPos = RobloxCoordsToRadar(BoltInfo[1], BoltInfo[2]);
		var Text = "";

		if (BoltInfo[0] == "Explosive") {
			Text = "^";
		} else if (BoltInfo[0] == "Projectile") {
			Text = "!";
		} else if (BoltInfo[0] == "MinorProjectile") {
			Text = "'";
		}

		Pen.fillText(Text, BoltPos.X, BoltPos.Y);
	}

	for (const ObjIndex in Data.TAP) {
		const Obj = Data.TAP[ObjIndex];

		if (Obj[0] == "CapturePoint") {
			var Pos = RobloxCoordsToRadar(Obj[1], Obj[2]);
			Pen.font = "14px Consolas, Courier Bold, Courier";
			Pen.fillStyle = Obj[4];
			Pen.fillText(Obj[3].substring(0, 1), Pos.X, Pos.Y + 5);

			Pen.beginPath();
			Pen.arc(Pos.X, Pos.Y, 10, 0, 2 * Math.PI);
			Pen.strokeStyle = "rgba(255, 255, 255, 0.1)";
			Pen.lineWidth = "8";
			Pen.stroke();
		} else if (Obj[0] == "Rock") {
			var Pos = RobloxCoordsToRadar(Obj[1], Obj[2]);
			Pen.strokeStyle = "rgb(50,50,50)";
			Pen.beginPath();
			Pen.lineWidth = "4";
			Pen.rect(Pos.X, Pos.Y, 2, 2);
			Pen.stroke();

			Pen.strokeStyle = "rgb(25,25,25)";
			Pen.beginPath();
			Pen.lineWidth = "3";
			Pen.rect(Pos.X, Pos.Y, 2, 2);
			Pen.stroke();
		}
	}

	// Grid //

	for(var x=0.5;x<=Canvas.width+2;x+=50) {
		Pen.moveTo(x, 0);
		Pen.lineTo(x, Canvas.width);
	}

	for(var y=0.5; y<=Canvas.height+2; y+=50) {
		Pen.moveTo(0, y);
		Pen.lineTo(Canvas.height, y);
	}

	Pen.strokeStyle = "rgba(255, 255, 255, 0.1)";
	Pen.lineWidth = "1";
	Pen.stroke();

	// Players //

	for (const PlayerInfoIndex in Data.PlayerLocations) {
		const PlayerInfo = Data.PlayerLocations[PlayerInfoIndex];

		// Translate Data

		var RadarCoords = RobloxCoordsToRadar(PlayerInfo.Position.X, PlayerInfo.Position.Y);
		var DiffCoords = RobloxCoordsToRadar(PlayerInfo.Position.X + (PlayerInfo.Velocity.X * 1.5), PlayerInfo.Position.Y + (PlayerInfo.Velocity.Y * 1.5));

		// Draw Dot
		if (PlayerInfo.LocalPlayer) {
			Pen.beginPath();
			Pen.arc(RadarCoords.X, RadarCoords.Y, 50, 0, 2 * Math.PI);
			Pen.strokeStyle = "rgba(255, 255, 255, 0.1)";
			Pen.lineWidth = "5";

			Pen.stroke();
			Pen.strokeStyle = PlayerInfo.TeamColor;
			Pen.lineWidth = "1";
		}

		if (PlayerInfo.TeamMate && !PlayerInfo.LocalPlayer) {
			Pen.beginPath();
			Pen.arc(RadarCoords.X, RadarCoords.Y, 5, 0, 2 * Math.PI);
			Pen.strokeStyle = "rgba(255, 255, 255, 0.1)";
			Pen.lineWidth = "5";

			Pen.stroke();
			Pen.strokeStyle = PlayerInfo.TeamColor;
			Pen.lineWidth = "1";
		}

		Pen.strokeStyle = PlayerInfo.TeamColor;
		Pen.beginPath();
		Pen.lineWidth = "1";
		Pen.rect(RadarCoords.X - 1, RadarCoords.Y - 1, 3, 3);
		Pen.stroke();

		// Draw Username
		Pen.font = "12px Consolas, Courier Bold, Courier";
		Pen.fillStyle = `${PlayerInfo.TeamColor}`;
		Pen.fillText(PlayerInfo.Name, RadarCoords.X, RadarCoords.Y - 20);

		// Draw Data
		Pen.fillText(`Alt: ${Math.round(PlayerInfo.Position.Alt)} | HP: ${PlayerInfo.Health}`, RadarCoords.X, RadarCoords.Y - 7);

		// Velocity Indicator
		Pen.beginPath();
		Pen.moveTo(RadarCoords.X, RadarCoords.Y);
		Pen.lineTo(DiffCoords.X, DiffCoords.Y);
		Pen.stroke();
	}

	// Explosions

	Pen.fillStyle = "rgba(255, 50, 50, 0.3)";

	for (const ExIndex in Data.Explosions) {
		const Ex = Data.Explosions[ExIndex];
		var Pos = RobloxCoordsToRadar(Ex[0], Ex[1]);
		Pen.beginPath();
		Pen.arc(Pos.X, Pos.Y, 12, 0, 2 * Math.PI);
		Pen.lineWidth = "8";
		Pen.fill();
	}
}