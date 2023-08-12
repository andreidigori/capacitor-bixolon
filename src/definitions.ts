export interface BixolonPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
