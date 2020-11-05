vec3 scaleToFullscreen(vec2 uv, vec3 pos, float progress) {
	vec2 meshPosition = vec2(0.0);
	vec2 meshScale = vec2(1.0);
	vec2 viewSize = vec2(1.0);

	float activation = uv.x;
	float latestStart = 0.5;
	float startAt = activation * latestStart;
	float vertexProgress = smoothstep(startAt, 1.0, progress);

	vec2 scaleToViewSize = viewSize / meshScale - 1.0;
	//vec2 scale = vec2(1.0 + scaleToViewSize * vertexProgress);
	vec2 scale = vec2(1.0 + scaleToViewSize * progress);
	pos.xy *= scale;

	pos.x += -meshPosition.x * vertexProgress;
	pos.y += -meshPosition.y * vertexProgress;

	return pos;
}
