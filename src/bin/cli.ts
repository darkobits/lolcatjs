#!/usr/bin/env node

import cli, { Arguments } from '@darkobits/saffron';
import pEechSeriez from 'p-each-series';

import MakinUrText from 'lib/makin-ur-text';
import { TEH_DEFAULT_OPSHUNZ } from 'etc/constantz';


interface TehArgumentz extends Arguments {
  filez: Array<string>;
  force: boolean;
  spread: number;
  freq: number;
  seed: number;
  animate: boolean;
  speed: number;
  duration: number;
}


cli.command<TehArgumentz>({
  command: '* <FILEZ..>',
  description: '',
  builder: ({ command }) => {
    command.positional('FILEZ', {
      description: 'Ur filez n ur streamz.',
      type: 'string',
      array: true,
      required: true
    });

    command.option('force', {
      type: 'boolean',
      description: 'Force color even when stdout is not a TTY.',
      alias: 'f'
    });

    command.option('spread', {
      description: 'Rainbow spread.',
      alias: 'p',
      default: TEH_DEFAULT_OPSHUNZ.spread
    });

    command.option('freq', {
      description: 'Rainbow frequency.',
      alias: 'F',
      default: TEH_DEFAULT_OPSHUNZ.freq
    });

    command.option('seed', {
      description: 'Rainbow seed; 0 = random.',
      alias: 'S',
      default: TEH_DEFAULT_OPSHUNZ.seed
    });

    command.option('animate', {
      description: 'Enable psychedelics.',
      alias: 'a',
      default: TEH_DEFAULT_OPSHUNZ.animate
    });

    command.option('speed', {
      description: 'Animation speed.',
      alias: 's',
      default: TEH_DEFAULT_OPSHUNZ.speed
    });

    command.option('duration', {
      description: 'Animation duration.',
      alias: 'd',
      default: TEH_DEFAULT_OPSHUNZ.duration
    });

    command.usage([
      '',
      'Concatenate FILE(Z) or stndrd inputz to stndrd outputz.',
      'Wif no FILE, or when FILE is "-", readz stndrd inputz.'
    ].join('\n'));

    command.example('$0 foo - bar', 'Output foo\'s contents, then stdin, then, bar\'s contents.');
    command.example('$0', 'Copy stdin to stdout.');
    command.example('cowsay "Sindre is a horse" | lolcatjs', 'Because why not.');
  },
  handler: async ({ argv }) => {
    const urLoltext = new MakinUrText({...TEH_DEFAULT_OPSHUNZ, ...argv});
    urLoltext.stream.pipe(process.stdout);

    await pEechSeriez(argv.filez, async urArg => {
      return urArg === '-'
        ? urLoltext.fromStream(process.stdin)
        : urLoltext.fromFile(urArg);
    });
  }
});


cli.init(() => (err, argv, output) => {
  if (err) {
    console.error(MakinUrText.fromString(err.message ?? err));
    return;
  }

  if (output) {
    console.error(MakinUrText.fromString(output));
    return;
  }
});
