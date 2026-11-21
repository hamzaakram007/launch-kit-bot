import { PermissionFlagsBits } from "discord.js";
import { replyError, replyEphemeral } from "../lib/replies.js";

/**
 * /setup — create Spoiler-OK role when the bot has Manage Roles.
 */
export async function handleSetup(interaction) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
    await replyError(interaction, "You need **Manage Server** to run `/setup`.");
    return;
  }

  const guild = interaction.guild;
  if (!guild) {
    await replyError(interaction, "Setup only works inside a server.");
    return;
  }

  const me = guild.members.me;
  if (!me?.permissions.has(PermissionFlagsBits.ManageRoles)) {
    await replyError(
      interaction,
      "I need the **Manage Roles** permission. Re-invite with that permission, then try again.",
    );
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
    } catch (err) {
      console.error("[launch-kit-bot] role create failed", err);
      await replyError(
        interaction,
        "Could not create the Spoiler-OK role. Check my role is above new roles and I have Manage Roles.",
      );
      return;
    }
  }

  await replyEphemeral(
    interaction,
    [
      `Setup complete.`,
      `Role ready: **${role.name}** (\`${role.id}\`).`,
      `Next: create a spoiler channel → deny @everyone View Channel → allow Spoiler-OK.`,
      `Then try \`/countdown set\`, \`/faq\`, and \`/tip show\`.`,
    ].join("\n"),
  );
}
