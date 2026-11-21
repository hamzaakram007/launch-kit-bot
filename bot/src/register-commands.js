/**
 * Register slash commands. Requires DISCORD_TOKEN + CLIENT_ID.
 * Optional GUILD_ID for faster guild-scoped registration during development.
 */

import { config as loadDotenv } from "dotenv";
import { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { assertRegisterEnv, loadEnv } from "./lib/env.js";

loadDotenv();

const env = loadEnv();
assertRegisterEnv(env);

const commands = [
  new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Create Spoiler-OK role and basic launch-kit gates")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .toJSON(),
  new SlashCommandBuilder()
    .setName("countdown")
    .setDescription("Set or show a launch countdown")
    .addSubcommand((sub) =>
      sub
        .setName("set")
        .setDescription("Set countdown target (ISO datetime)")
        .addStringOption((opt) =>
          opt
            .setName("when")
            .setDescription("ISO datetime, e.g. 2026-12-01T00:00:00Z")
            .setRequired(true)
            .setMaxLength(64),
        ),
    )
    .addSubcommand((sub) => sub.setName("show").setDescription("Show current countdown"))
    .addSubcommand((sub) => sub.setName("clear").setDescription("Clear the countdown"))
    .toJSON(),
  new SlashCommandBuilder()
    .setName("faq")
    .setDescription("Post FAQ button panel (owner-written seed replies)")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .toJSON(),
  new SlashCommandBuilder()
    .setName("tip")
    .setDescription("Tip of the day — show, add, or list spoiler-free tips")
    .addSubcommand((sub) => sub.setName("show").setDescription("Post the next tip"))
    .addSubcommand((sub) =>
      sub
        .setName("add")
        .setDescription("Add a tip to the queue (Manage Server)")
        .addStringOption((opt) =>
          opt
            .setName("text")
            .setDescription("Tip text (3–280 chars)")
            .setRequired(true)
            .setMinLength(3)
            .setMaxLength(280),
        ),
    )
    .addSubcommand((sub) =>
      sub.setName("list").setDescription("Show how many tips are queued"),
    )
    .toJSON(),
];

const rest = new REST({ version: "10" }).setToken(env.token);

const route = env.guildId
  ? Routes.applicationGuildCommands(env.clientId, env.guildId)
  : Routes.applicationCommands(env.clientId);

await rest.put(route, { body: commands });
console.log(
  `[launch-kit-bot] registered ${commands.length} commands ${
    env.guildId ? `to guild ${env.guildId}` : "globally"
  }`,
);
