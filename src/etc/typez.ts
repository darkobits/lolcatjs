/**
 * When we doesn't know what is a type?
 */
export type idk = any;


/**
 * 4 when ur types r nothin. :<
 */
export type newp = void;


/**
 * When type can eithr meen yez or no.
 */
export type yesOrNo = boolean;


/**
 * 4 letters an werdz.
 */
export type loltext = string;


/**
 * 4 countin things.
 */
export type howMany = number;
export type howMuch = number;
export type howLong = number;
export type howLow = number;
export type howHigh = number;


/**
 * Dis iz wut iz a color.
 */
export interface ItsAColor {
  red: howMuch;
  green: howMuch;
  blue: howMuch;
}


/**
 * We ned dis 4 makin text.
 */
export interface MuhLolcatOpts {
  [index: string]: idk;

  /**
   * Rainbow sed.
   */
  seed?: howMuch;

  /**
   * Rainbow frequency.
   */
  freq?: howLong;

  /**
   * Rainbow spread.
   */
  spread?: howMuch;

  /**
   * Enable animation.
   */
  animate?: yesOrNo;

  /**
   * Animation duration.
   */
  duration?: howLong;

  /**
   * Animation sped.
   */
  speed?: howMuch;

  /**
   * Force color even when stdout iz not TTY.
   */
  force?: yesOrNo;
}
