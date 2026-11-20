import { MessageFlags, PermissionFlagsBits } from "discord.js";

/**
 * High-level /setup stub: creates a Spoiler-OK role when the bot has Manage Roles.
 * Channel overwrite wiring can be expanded later.
 */
export async function handleSetup(interaction) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
    await interaction.reply({
      content: "You need Manage Server to run /setup.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const guild = interaction.guild;
  if (!guild) {
    await interaction.reply({
      content: "Setup only works inside a server.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  let role = guild.roles.cache.find((r) => r.name === "Spoiler-OK");
  if (!role) {
    try {
      role = await guild.roles.create({
        name: "Spoiler-OK",
        reason: "Launch Kit Bot /setup — spoiler-safe self-assign role",
        mentionable: false,
      });
    } catch {
      await interaction.reply({
        content:
          "Could not create Spoiler-OK role (missing Manage Roles?). See the README for required permissions.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
  }

  await interaction.reply({
    content: [
      `Setup complete.`,
      `Role ready: **${role.name}** (\`${role.id}\`).`,
      `Next: create a spoiler channel and deny @everyone view, allow Spoiler-OK.`,
      `FAQ + countdown modules stay off until toggled in the dashboard.`,
    ].join("\n"),
    flags: MessageFlags.Ephemeral,
  });
}
