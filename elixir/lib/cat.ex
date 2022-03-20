defmodule Cat do
  @moduledoc """
  cat 명령어의 구현체입니다.
  """

  require Utils
  require DefGuard

  @spec meow(Enum.t()) :: :ok
  defp meow(args) when DefGuard.help(args), do: IO.puts(Utils.manual())

  # TODO: 지금은 첫번 째 파일만 읽도록 헀지만, 그 다음 args도 처리해야 합니다.
  defp meow(args) when DefGuard.lineNumber(args) do
    case File.read(Enum.at(args, 1)) do
      {:ok, body} ->
        String.split(body, "\n")
        |> Enum.with_index(1)
        |> Enum.each(fn {line, index} -> IO.puts("#{index} #{line}") end)

      {:error, _} ->
        IO.puts(Utils.notFound(Enum.at(args, 1)))
    end
  end

  defp meow(args) do
    case File.read(hd(args)) do
      {:ok, body} -> IO.puts(body)
      {:error, _} -> IO.puts(Utils.notFound(hd(args)))
    end
  end

  @doc """
  파일을 읽은 뒤 출력합니다.

  ## Parameters

    - args: 파일의 경로를 입력합니다.

  ## Examples

    iex> Cat.main(["./README.md"])
    # Cat...
    :ok

  """
  @spec main(Enum.t()) :: :ok
  def main(args), do: meow(args)
end
