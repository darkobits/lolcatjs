#!/usr/bin/env node

import yargz from 'yargs';
import MakinUrText from 'lib/makin-ur-text';
import {none, TEH_DEFAULT_OPSHUNZ} from 'etc/constantz';
import {idk} from 'etc/typez';


const argzParser = yargz
  .usage([
    '$0 [OPTION]... [FILE]...\n\n',
    'Concatenate FILE(s) or standard input to standard output.\n',
    'With no FILE, or when FILE is "-", read standard input.'
  ].join(''))
  .example('$0 foo - bar', 'Output foo\'s contents, then stdin, then, bar\'s contents.')
  .example('$0', 'Copy stdin to stdout.')
  .example('cowsay "Sindre is a horse" | lolcatjs', 'Because why not.')
  .option('force', {
    description: 'Force color even when stdout is not a TTY.',
    alias: 'f'
  })
  .option('spread', {
    description: 'Rainbow spread.',
    alias: 'p',
    default: TEH_DEFAULT_OPSHUNZ.spread
  })
  .option('freq', {
    description: 'Rainbow frequency.',
    alias: 'F',
    default: TEH_DEFAULT_OPSHUNZ.freq
  })
  .option('seed', {
    description: 'Rainbow seed; 0 = random.',
    alias: 'S',
    default: TEH_DEFAULT_OPSHUNZ.seed
  })
  .option('animate', {
    description: 'Enable psychedelics.',
    alias: 'a',
    default: TEH_DEFAULT_OPSHUNZ.animate
  })
  .option('speed', {
    description: 'Animation speed.',
    alias: 's',
    default: TEH_DEFAULT_OPSHUNZ.speed
  })
  .option('duration', {
    description: 'Animation duration.',
    alias: 'd',
    default: TEH_DEFAULT_OPSHUNZ.duration
  })
  .wrap(yargz.terminalWidth())
  .strict()
  .version()
  .help();


async function imInUrTerminalzParsinUrArgz(parser: yargz.Argv) {
  // Dis lets us git teh halptxt frm yargz sos we can lol-ify it.
  const parsedArgz = await new Promise<yargz.Arguments>((keep, noKeep) => {
    parser.parse(process.argv, async (err: Error, argv: yargz.Arguments, output: string) => {
      return (err || argv.help || argv.version) ? noKeep(output) : keep(argv);
    });
  });

  const positionalArgz = parsedArgz._.slice(2);
  const urLoltext = new MakinUrText({...TEH_DEFAULT_OPSHUNZ, ...parsedArgz});

  urLoltext.stream.pipe(process.stdout);

  if (positionalArgz.length === none) {
    positionalArgz.push('-');
  }

  await positionalArgz.reduce(async (forDis, urArg) => {
    await forDis;

    if (urArg === '-') {
      return urLoltext.fromStream(process.stdin);
    }

    return urLoltext.fromFile(urArg);
  }, Promise.resolve() as Promise<idk>);
}


export default (async () => {
  try {
    await imInUrTerminalzParsinUrArgz(argzParser);
  } catch (err) {
    console.error(MakinUrText.fromString(err.message || err));
    process.exit(1);
  }
})();
