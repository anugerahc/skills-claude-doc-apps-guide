# App User Guide Generator installer (Windows PowerShell) — auto-detect AI coding tool(s) in
# target project and wire up the adapter.
# Usage:
#   .\install.ps1 [-Target <path>] [-Tools claude,cursor,...] [-All]
param(
    [string]$Target = ".",
    [string[]]$Tools = @(),
    [switch]$All
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Target = (Resolve-Path $Target).Path
Write-Host "Target project: $Target"

# 1. Copy core + template (always, merge)
New-Item -ItemType Directory -Force -Path "$Target\_app-user-guide-generator" | Out-Null
Copy-Item "$ScriptDir\core" "$Target\_app-user-guide-generator\" -Recurse -Force
Copy-Item "$ScriptDir\template" "$Target\_app-user-guide-generator\" -Recurse -Force
Write-Host "core/ + template/ copied to $Target\_app-user-guide-generator\"

# 2. Detect tools if not explicitly given
if ($Tools.Count -eq 0 -and -not $All) {
    if (Test-Path "$Target\.claude") { $Tools += "claude" }
    if (Test-Path "$Target\.agents") { $Tools += "antigravity" }
    if (Test-Path "$Target\.kiro") { $Tools += "kiro" }
    if (Test-Path "$Target\.cursor") { $Tools += "cursor" }
    if (Test-Path "$Target\AGENTS.md") { $Tools += "codex" }

    if ($Tools.Count -eq 0) {
        Write-Host "Gak kedetek tool AI coding apapun di $Target."
        $input = Read-Host "Pilih manual (pisah spasi) dari: claude antigravity kiro cursor codex"
        $Tools = $input -split '\s+' | Where-Object { $_ -ne "" }
    } else {
        Write-Host "Kedetek tool: $($Tools -join ', ')"
    }
}
if ($All) { $Tools = @("claude", "antigravity", "kiro", "cursor", "codex") }

# 3. Install adapter per tool
foreach ($tool in $Tools) {
    switch ($tool) {
        "claude" {
            New-Item -ItemType Directory -Force -Path "$Target\.claude\skills\app-user-guide-generator" | Out-Null
            Copy-Item "$ScriptDir\adapters\claude-code\SKILL.md" "$Target\.claude\skills\app-user-guide-generator\SKILL.md" -Force
            Write-Host "[claude] .claude/skills/app-user-guide-generator/SKILL.md"
        }
        "antigravity" {
            New-Item -ItemType Directory -Force -Path "$Target\.agents\skills\app-user-guide-generator" | Out-Null
            New-Item -ItemType Directory -Force -Path "$Target\.agents\workflows" | Out-Null
            Copy-Item "$ScriptDir\adapters\antigravity\.agents\skills\app-user-guide-generator\SKILL.md" "$Target\.agents\skills\app-user-guide-generator\SKILL.md" -Force
            Copy-Item "$ScriptDir\adapters\antigravity\.agents\workflows\app_user_guide_generator.md" "$Target\.agents\workflows\app_user_guide_generator.md" -Force
            Write-Host "[antigravity] .agents/skills/app-user-guide-generator/, .agents/workflows/app_user_guide_generator.md"
        }
        "kiro" {
            New-Item -ItemType Directory -Force -Path "$Target\.kiro\steering" | Out-Null
            Copy-Item "$ScriptDir\adapters\kiro\.kiro\steering\app-user-guide-generator.md" "$Target\.kiro\steering\app-user-guide-generator.md" -Force
            Write-Host "[kiro] .kiro/steering/app-user-guide-generator.md"
        }
        "cursor" {
            New-Item -ItemType Directory -Force -Path "$Target\.cursor\rules" | Out-Null
            Copy-Item "$ScriptDir\adapters\cursor\.cursor\rules\app-user-guide-generator.mdc" "$Target\.cursor\rules\app-user-guide-generator.mdc" -Force
            Write-Host "[cursor] .cursor/rules/app-user-guide-generator.mdc"
        }
        "codex" {
            $marker = "<!-- app-user-guide-generator:start -->"
            $agentsPath = "$Target\AGENTS.md"
            $already = (Test-Path $agentsPath) -and (Select-String -Path $agentsPath -Pattern ([regex]::Escape($marker)) -Quiet)
            if ($already) {
                Write-Host "[codex] AGENTS.md already has app-user-guide-generator block, skipped"
            } else {
                $block = "`n$marker`n" + (Get-Content "$ScriptDir\adapters\codex\AGENTS.md" -Raw) + "`n<!-- app-user-guide-generator:end -->`n"
                Add-Content -Path $agentsPath -Value $block
                Write-Host "[codex] appended block to AGENTS.md"
            }
        }
        default {
            Write-Host "Tool gak dikenal: $tool (skip)"
        }
    }
}

Write-Host ""
Write-Host "Selesai. Baca $Target\_app-user-guide-generator\core\app-user-guide-generator-core.md buat metodologi lengkap."
