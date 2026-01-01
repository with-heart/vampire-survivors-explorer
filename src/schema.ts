import * as S from 'effect/Schema'

const WeaponStats = S.Struct({
  speed: S.Number,
  duration: S.Number,
  cooldown: S.Number,
  hitBoxDelay: S.Number,
  critChance: S.Number,
  critMul: S.Number,
  area: S.Number,
  amount: S.Number,
  power: S.Number,
  secondaryPower: S.Number,
  armor: S.Number,
  maxHp: S.Number,
  regen: S.Number,
  moveSpeed: S.Number,
  magnet: S.Number,
  luck: S.Number,
  greed: S.Number,
  curse: S.Number,
  charm: S.Number,
  fever: S.Number,
  shieldInvulTime: S.Number,
  invulTimeBonus: S.Number,
  revivals: S.Number,
  growth: S.Number,
  charges: S.Number,
  interval: S.Number,
  repeatInterval: S.Number,
  knockback: S.Number,
  penetrating: S.Number,
  chance: S.Number,
})

const RequiredPrimaryWeaponEntry = S.Struct({
  id: S.String,
  level: S.Number,
  name: S.String,
  frameName: S.String,
  texture: S.String,
  rarity: S.Number,
})

const OptionalPrimaryWeaponEntry = S.partial(
  S.Struct({
    contentGroup: S.String,
    bulletType: S.String,
    collectionFrame: S.String,
    isUnlocked: S.Boolean,
    sealable: S.Boolean,
    unexcludeSelf: S.Boolean,
    poolLimit: S.Number,
    hitsWalls: S.Boolean,
    evolvesFrom: S.Array(S.String),
    requires: S.Array(S.String),
    requiresMax: S.Array(S.String),
    hasUniqueRequirements: S.Boolean,
    isEvolution: S.Boolean,
    isSpecialOnly: S.Boolean,
    hidden: S.Boolean,
    alwaysHidden: S.Boolean,
    customDescValue: S.String,
    weaponType: S.String,
    price: S.Number,
    description: S.String,
    tips: S.String,
    isPowerUp: S.Boolean,
    allowDuplicates: S.Boolean,
    followerType: S.String,
    followerAI: S.String,
    evoInto: S.String,
    evoSynergy: S.Array(S.String),
    evolutionLine: S.Array(S.String),
    hitVFX: S.String,
    dropRateAffectedByLuck: S.Boolean,
    intervalDependsOnDuration: S.Boolean,
    canCrit: S.Boolean,
    volume: S.Number,
    skipRemovingBaseWeapon: S.Boolean,
    forcedSynergyWeapons: S.Array(S.String),
    bounces: S.Number,
    despawnOnUnavailable: S.Boolean,
    displayAsPassive: S.Boolean,
    freezeChance: S.Number,
    appliesOnlyToOwner: S.Boolean,
    override: S.String,
    customOverrideValue: S.String,
    ...WeaponStats.fields,
  }),
)

export const PrimaryWeaponEntry = S.extend(
  RequiredPrimaryWeaponEntry,
  OptionalPrimaryWeaponEntry,
)
export type PrimaryWeaponEntry = typeof PrimaryWeaponEntry.Type

export const SecondaryWeaponEntry = S.partial(
  S.Struct({
    addEvolvedWeapon: S.String,
    customDesc: S.Number,
    addNormalWeapon: S.NullOr(S.String),
    excludeWeapon: S.String,
    customOverride: S.Number,
    ...WeaponStats.fields,
  }),
)
export type SecondaryWeaponEntry = typeof SecondaryWeaponEntry.Type

export const WeaponEntries = S.Tuple([PrimaryWeaponEntry], SecondaryWeaponEntry)
export type WeaponEntries = typeof WeaponEntries.Type

export const WeaponJson = S.Record({
  key: S.String,
  value: WeaponEntries,
})
export type WeaponJson = typeof WeaponJson.Type
