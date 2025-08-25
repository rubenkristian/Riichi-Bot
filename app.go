package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/rubenkristian/riichi-turney/database"
	discordbot "github.com/rubenkristian/riichi-turney/discord-bot"
	riichicommand "github.com/rubenkristian/riichi-turney/riichi-command"
	"github.com/rubenkristian/riichi-turney/services"
)

// App struct
type App struct {
	ctx        context.Context
	RiichiDB   *database.DatabaseGame
	Riichi     *riichicommand.RiichiApi
	DiscordBot *discordbot.DiscordBot
	Service    *services.AppService
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx

	riichiDb, err := database.CreateDatabaseGame()

	if err != nil {
		log.Printf("⚠️ Failed to initialize session: %v\n", err)
	}
	riichiCommand := riichicommand.CreateRiichiApi(riichiDb)

	a.Riichi = riichiCommand
	a.RiichiDB = riichiDb
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
	a.StopBot()
}

func (a *App) CheckSession() bool {
	return a.Riichi.CheckSession()
}

func (a *App) LogoutRiichi() error {
	if a.RiichiDB == nil || a.Riichi == nil {
		return fmt.Errorf("Failed to start bot, you must login first")
	}

	a.Riichi.Logout()

	return nil
}

func (a *App) LoginRiichiApi(username, password string) error {
	domain := "https://d3qgi0t347dz44.cloudfront.net/release/notice/domain_name.ncc"
	if err := a.Riichi.SetupRiichi(domain, username, password); err != nil {
		return err
	}

	return nil
}

func (a *App) StartBot(token, serverId, channelAdmin, channelNotify string) error {
	if a.RiichiDB == nil || a.Riichi == nil {
		return fmt.Errorf("Failed to start bot, you must login first")
	}
	disbot := discordbot.CreateDiscordBot(a.RiichiDB, a.Riichi)

	if err := disbot.StartBot(token, serverId, channelAdmin, channelNotify); err != nil {
		return err
	}

	service := services.StartAppService(a.RiichiDB, a.Riichi, &disbot.Client, &disbot.Setting)

	a.DiscordBot = disbot
	a.Service = service

	return nil
}

func (a *App) StopBot() error {
	if a.DiscordBot == nil {
		return fmt.Errorf("Failed to stop bot")
	}

	if err := a.DiscordBot.EndBot(); err != nil {
		return err
	}

	return nil
}

func (a *App) IsBotRunning() bool {
	return a.DiscordBot.IsRunning
}

func (a *App) InputTournament(turneyId uint64, register string, roleId string) (*database.Tournament, error) {
	if a.Service == nil || a.Riichi == nil {
		return nil, fmt.Errorf("Please login before input tournament")
	}

	registerAt, err := time.Parse("2006-01-02", register)

	if err != nil {
		return nil, err
	}

	tournament, err := a.Service.FetchTournamentInfo(turneyId, registerAt, roleId)

	if err != nil {
		return nil, err
	}

	return tournament, nil
}

func (a *App) SendPlayerInvite(tourneyId uint64) error {
	if a.Service == nil || a.Riichi == nil {
		return fmt.Errorf("Please login before input tournament")
	}

	if err := a.Service.SendInvite(tourneyId); err != nil {
		return err
	}

	return nil
}

func (a *App) StartTable(tableId uint64) error {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return fmt.Errorf("Please login before input tournament")
	}

	if err := a.Service.StartTable(tableId); err != nil {
		return err
	}

	return nil
}

func (a *App) ListTournament(query database.PaginationTournament) ([]database.Tournament, error) {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return nil, fmt.Errorf("Please login before input tournament")
	}

	tournaments, err := a.RiichiDB.ListTournament(query)

	if err != nil {
		return nil, err
	}

	return tournaments, nil
}

func (a *App) ListMatch(tournamentId uint64, query database.PaginationMatch) ([]database.Match, error) {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return nil, fmt.Errorf("Please login before input tournament")
	}

	matches, err := a.RiichiDB.ListMatch(tournamentId, query)

	if err != nil {
		return nil, err
	}

	return matches, nil
}

func (a *App) DetailDataTournament(tournamentId uint64) (*database.Tournament, error) {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return nil, fmt.Errorf("Please login before input tournament")
	}

	tournament, err := a.Riichi.DbGame.GetTournament(tournamentId)

	if err != nil {
		return nil, err
	}

	return tournament, nil
}

func (a *App) CreateTable(turneyId uint64, players []uint64) error {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return fmt.Errorf("Please login before input tournament")
	}

	_, err := a.RiichiDB.CreateMatch(database.MatchBody{
		TournamentId: turneyId,
		Players:      players,
	})

	if err != nil {
		return err
	}

	return nil
}

func (a *App) FetchScoreTurnament(turneyId uint64) error {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return fmt.Errorf("Please login before input tournament")
	}

	if err := a.Service.FetchTournamentMatch(turneyId); err != nil {
		return err
	}

	return nil
}

func (a *App) FetchDetailScoreTournament(tournamentMatchId, paiPuId string) error {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return fmt.Errorf("Please login before input tournament")
	}

	if err := a.Service.FetchDetailTournamentMatch(tournamentMatchId, paiPuId); err != nil {
		return err
	}

	return nil
}

func (a *App) InputTournamentMatchScore(tournamentMatchPlayerId uint64, penalty int64) error {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return fmt.Errorf("Please login before input tournament")
	}

	if err := a.Service.InputTournamentMatchPlayerPenalty(tournamentMatchPlayerId, penalty); err != nil {
		return err
	}

	return nil
}

func (a *App) GetRegisteredPlayers(isMatch bool, tournamentId uint64, search string, paginate database.Pagination) ([]database.RegisterTournament, error) {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return nil, fmt.Errorf("Please login before input tournament")
	}

	registerPlayer, err := a.RiichiDB.ListRegisterTournamentPlayers(isMatch, tournamentId, search, paginate)

	if err != nil {
		return nil, err
	}

	return registerPlayer, nil
}

func (a *App) GetTournamentMatchList(tournamentId uint64, paginate database.PaginationTournament) ([]database.TournamentMatch, error) {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return nil, fmt.Errorf("Please login before input tournament")
	}

	tournamentMatches, err := a.RiichiDB.ListTournamentMatch(tournamentId, paginate)

	if err != nil {
		return nil, err
	}

	return tournamentMatches, nil
}

func (a *App) GetDetailTournamentMatch(tableId string) (*database.TournamentMatch, error) {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return nil, fmt.Errorf("Please login before input tournament")
	}

	tournamentMatch, err := a.RiichiDB.GetTournamentMatchById(tableId)

	if err != nil {
		return nil, err
	}

	return tournamentMatch, nil
}

func (a *App) FetchDetailTournamentMatch(tournamentMatchId string, paiPuId string) error {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return fmt.Errorf("Please login before input tournament")
	}

	err := a.Service.FetchDetailTournamentMatch(tournamentMatchId, paiPuId)

	if err != nil {
		return err
	}

	return nil
}

func (a *App) SubmitDetailTournamentMatch(tournamentMatchPlayerId uint64, penalty int64) error {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return fmt.Errorf("Please login before input tournament")
	}

	err := a.Service.InputTournamentMatchPlayerPenalty(tournamentMatchPlayerId, penalty)

	if err != nil {
		return err
	}

	return nil
}

func (a *App) FetchLog(paiPuId string) (*riichicommand.Log, error) {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return nil, fmt.Errorf("Please login before input tournament")
	}

	log, err := a.Riichi.FetchLog(paiPuId)

	if err != nil {
		return nil, err
	}

	return log, nil
}

func (a *App) SubmitPoint(tournamentMatchPlayerId uint64, penalty int64) error {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return fmt.Errorf("Please login before input tournament")
	}

	if err := a.Service.InputTournamentMatchPlayerPenalty(tournamentMatchPlayerId, penalty); err != nil {
		return err
	}

	return nil
}

func (a *App) GetListTable(tournamentId uint64, query database.PaginationMatch) ([]database.Match, error) {
	if a.Service == nil || a.Riichi == nil || a.DiscordBot == nil {
		return nil, fmt.Errorf("Please login before input tournament")
	}

	matches, err := a.RiichiDB.ListMatch(tournamentId, query)

	if err != nil {
		return nil, err
	}

	return matches, nil
}
