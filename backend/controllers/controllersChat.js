import { chat, chatValidation } from "../models/chat.js";

export async function postChat(req, res) {
    try {
        const { error, value } = chatValidation.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message})
        }

        const newChat = new chat(
            req.body
        )
        const nouvChat = await newChat.save()
        res.status(201).json(nouvChat)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message : error.message})
    }
}

export async function getAllChat(req, res) {
    try {
        const contents = await chat.find();
        res.status(200).json(contents);
      } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteLogById(req, res) {
    try {
        const supp = await chat.findByIdAndDelete(req.params.id);
        res.json({message : "Les logs de l'utilisateur ont bien été supprimés"})
    } catch (error) {
        res.status(500).json({ message : "L'utilisateur n'existe pas" });
    }
}