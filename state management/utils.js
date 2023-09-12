export const drawStatusText = (context, input, player) => {
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.font = '30px Helvetica';
  context.fillText(`Last key: ${input.lastKey}`, player.gameWidth / 2, 50);
  context.fillText(
    `Current State: ${player.currentState.state}`,
    player.gameWidth / 2,
    90
  );
};
