defmodule Cat do
  @moduledoc """
  Documentation for Cat.
  """

  @doc """
  Cat.

  ## Examples
      iex> Cat.run("./README.md")
      # Cat...
      :ok
  """
  def run(filepath) do
    case File.read(filepath) do
    {:ok, body} -> IO.puts(body)
    {:error, reason} -> IO.puts("cat: #{filepath}: No such file or directory")
    end
  end
end
