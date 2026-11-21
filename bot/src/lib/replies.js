import { MessageFlags } from "discord.js";

/** Safe ephemeral error — never leaks stack traces to Discord. */
export async function replyError(interaction, message) {
  const payload = {
    content: message,
    flags: MessageFlags.Ephemeral,
  };
  try {
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(payload);
    } else {
      await interaction.reply(payload);
    }
  } catch (err) {
    console.error("[launch-kit-bot] failed to send error reply", err);
  }
}

export async function replyEphemeral(interaction, content) {
  await interaction.reply({ content, flags: MessageFlags.Ephemeral });
}
