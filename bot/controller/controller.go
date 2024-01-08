package controller

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/Mendes113/todayNasa/service"
	"github.com/go-telegram-bot-api/telegram-bot-api"
	"github.com/joho/godotenv"
)


const startCommand = "start"



func Setup() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	token := os.Getenv("NASA_TOKEN")
if token == "" {
    log.Fatal("NASA_TOKEN environment variable not set")
}

	bot, err := tgbotapi.NewBotAPI(os.Getenv("TELEGRAM_TOKEN"))
	if err != nil {
		log.Fatal(err)
	}

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates, err := bot.GetUpdatesChan(u)

	log.Printf("Authorized on account %s", bot.Self.UserName)
	log.Printf("Bot is running...")
	
	go func() {
		for update := range updates {
			if update.Message != nil {
				if update.Message.IsCommand() && update.Message.Command() == startCommand {
					sendWelcomeMessage(bot, update.Message.Chat.ID)
				}
			} else if update.CallbackQuery != nil {
				handleCallbackQuery(update.CallbackQuery, bot)
			}
		}
	}()

	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	
	<-sc


	
}

// Deferred cleanup function
func cleanup() {
	service.DeleteJpgs()
	log.Println("Cleanup completed")
}

func sendWelcomeMessage(bot *tgbotapi.BotAPI, chatID int64) {
	welcomeMsg := tgbotapi.NewMessage(chatID, "Olá! Eu sou o TodayNasaBot🖥️!Comigo você pode receber as imagens diárias que a nasa pública 😊!")
	bot.Send(welcomeMsg)

	keyboard := tgbotapi.NewInlineKeyboardMarkup(
		tgbotapi.NewInlineKeyboardRow(
			tgbotapi.NewInlineKeyboardButtonData("Vamos Começar", "receive_img"),
		),
	)

	msg := tgbotapi.NewMessage(chatID, "Clique no botão abaixo para receber a imagem de hoje 🖼️")
	msg.ReplyMarkup = keyboard

	bot.Send(msg)
}


func handleCallbackQuery(callbackQuery *tgbotapi.CallbackQuery, bot *tgbotapi.BotAPI) {
	log.Printf("Callback query received: %s", callbackQuery.Data)
	if callbackQuery.Data == "receive_img" {
		log.Printf("Button 'receive_img' clicked by user %d in chat %d", callbackQuery.From.ID, callbackQuery.Message.Chat.ID)

		title := service.GetApiImg("https://api.nasa.gov/planetary/apod", os.Getenv("NASA_TOKEN"))
		// Example usage:
		explanation, err := service.GetImgExplanation("https://api.nasa.gov/planetary/apod", os.Getenv("NASA_TOKEN"))
		if err != nil {
			log.Fatal(err)
		}
		msg := tgbotapi.NewMessage(callbackQuery.Message.Chat.ID, "Aqui está a imagem de hoje 🖼️\n\n Descrição \n"+explanation)
		
		//send the img
		img := tgbotapi.NewPhotoUpload(callbackQuery.Message.Chat.ID, title+".jpg")
		if _, err := os.Stat(title + ".jpg"); os.IsNotExist(err) {
			log.Fatal(err)
		}

		bot.Send(img)
		bot.Send(msg)
		cleanup()

		
	}
}

