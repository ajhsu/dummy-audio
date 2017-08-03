import { createSilentAudio, execute } from './ffmpeg-wrapper';

test('createSilentAudio', () => {
  expect(
    createSilentAudio({ duration: 30 * 1000, filePath: 'example.mp3' })
  ).toBe(
    `ffmpeg -f lavfi -i aevalsrc=0:0::duration=30:sample_rate=44100 -ab 128k example.mp3 -y`
  );
});

test('execute', async () => {
  const result = await execute('echo "hello dummy.audio"');
  expect(result).toEqual({
    stdout: 'hello dummy.audio\n',
    stderr: ''
  });
});
