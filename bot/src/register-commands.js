/**
 * Register slash commands. Requires DISCORD_TOKEN + CLIENT_ID.
 * Optional GUILD_ID for faster guild-scoped registration during MVP.
 */

import { REST, Routes, SlashCommandBuilder } from "discord.js";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId) {
  console.error("Set DISCORD_TOKEN and CLIENT_ID before registering commands.");
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Create spoiler role + basic launch-kit channel stubs")
    .toJSON(),
  new SlashCommandBuilder()
    .setName("countdown")
    .setDescription("Set or show a launch countdown")
    .addSubcommand((sub) =>
      sub
        .setName("set")
        .setDescription("Set countdown target (ISO date stub)")
        .addStringOption((opt) =>
          opt.setName("when").setDescription("ISO datetime").setRequired(true),
        ),
    )
    .addSubcommand((sub) => sub.setName("show").setDescription("Show current countdown"))
    .toJSON(),
  new SlashCommandBuilder()
    .setName("faq")
    .setDescription("Post FAQ button panel (owner-written seed replies)")
    .toJSON(),
];

const rest = new REST({ version: "10" }).setToken(token);

const route = guildId
  ? Routes.applicationGuildCommands(clientId, guildId)
  : Routes.applicationCommands(clientId);

await rest.put(route, { body: commands });
console.log(
  `[launch-kit-bot] registered ${commands.length} commands ${guildId ? `to guild ${guildId}` : "globally"}`,
);
