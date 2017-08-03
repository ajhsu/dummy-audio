import { seconds, minutes } from '../time';
import { createSilentAudio, execute } from './ffmpeg-wrapper';

test('createSilentAudio', () => {
  {
    const silentAudio = createSilentAudio({ duration: 30 * seconds });
    expect(silentAudio.command).toBe(
      `ffmpeg -f lavfi -i aevalsrc=0:0::duration=30:sample_rate=44100 -ab 128k caches/silent-30000ms.mp3 -y`
    );
  }
  // 音檔長度上限十分鐘
  {
    expect(() => {
      createSilentAudio({ duration: 10 * minutes + 1 });
    }).toThrow();
  }
  {
    expect(() => {
      createSilentAudio({ duration: 'test' });
    }).toThrow();
  }
  {
    expect(() => {
      createSilentAudio();
    }).toThrow();
  }
  {
    expect(() => {
      createSilentAudio({ duration: 0 });
    }).toThrow();
  }
  {
    expect(() => {
      createSilentAudio({ duration: -1 });
    }).toThrow();
  }
  {
    expect(() => {
      createSilentAudio({ duration: NaN });
    }).toThrow();
  }
  {
    expect(() => {
      createSilentAudio({ duration: Number.MAX_VALUE });
    }).toThrow();
  }
});

test('execute', async () => {
  const result = await execute('echo "hello dummy.audio"');
  expect(result).toEqual({
    stdout: 'hello dummy.audio\n',
    stderr: ''
  });
});
